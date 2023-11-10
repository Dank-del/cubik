// import { scheduleJob } from 'node-schedule';

import { COMM, prisma } from '@cubik/database';

import getAssetsByGroup from './getAssetsByGroup';

interface Collection {
  collection: string;
}

async function syncCommunity() {
  const users = await prisma.user.findMany({
    select: {
      mainWallet: true,
      id: true,
    },
  });
  const communities = await prisma.communities.findMany({
    select: {
      method: true,
      collection: true,
      id: true,
    },
  });
  communities.forEach(async (community) => {
    if (community.method === COMM.MINT_ADD) {
      const collections = community.collection as unknown as Collection[];
      const communityMembers = await prisma.communityMembers.findMany({
        select: {
          id: true,
          userId: true,
          communityId: true,
        },
      });
      collections.map(async (entry) => {
        const response = await getAssetsByGroup('collection', entry.collection);
        // if a user by wallet address from the response.results map exists in communityMembers, do nothing, if not, add them, if they are in communityMembers but not in the response, remove them
        response?.map(async (asset) => {
          const user = users.find(
            (user) => user.mainWallet === asset.ownership?.owner,
          );
          if (user) {
            const member = communityMembers.find(
              (member) => member.userId === user.id,
            );
            if (!member) {
              await prisma.communityMembers.create({
                data: {
                  userId: user.id,
                  communityId: community.id,
                },
              });
            }
          }
        });
        // remove user by wallet address who don't have an asset in the response
        communityMembers.map(async (member) => {
          const user = users.find((user) => user.id === member.userId);
          const response = await getAssetsByGroup(
            'collection',
            entry.collection,
          );
          const asset = response.find(
            (asset) => asset.ownership?.owner === user?.mainWallet,
          );
          if (!asset) {
            await prisma.communityMembers.delete({
              where: {
                id: member.id,
              },
            });
          }
        });
      });
    }
  });
}

export { syncCommunity };
