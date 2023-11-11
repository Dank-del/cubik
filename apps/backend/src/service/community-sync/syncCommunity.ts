// import { scheduleJob } from 'node-schedule';

import { COMM, prisma } from '@cubik/database';

import getAssetsByGroup from './getAssetsByGroup';

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
  // console.log(users, communities);
  communities.forEach(async (community) => {
    if (community.method === COMM.MINT_ADD) {
      const collections = community.collection as unknown as string[];
      const communityMembers = await prisma.communityMembers.findMany({
        select: {
          id: true,
          userId: true,
          communityId: true,
        },
      });
      collections.map(async (entry) => {
        const response = await getAssetsByGroup('collection', entry);
        // if a user by wallet address from the response.results map exists in communityMembers, do nothing, if not, add them, if they are in communityMembers but not in the response, remove them
        response?.map(async (asset) => {
          const user = users.find(
            (user) => user.mainWallet === asset.ownership?.owner,
          );
          if (user) {
            const member = communityMembers.find(
              (member) => member.userId === user.id,
            );
            if (member) {
              console.log(`${user.id} in communityMembers, doing nothing...`);
            }
            if (!member) {
              console.log(`${user.id} not in communityMembers, adding...`);
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
          const response = await getAssetsByGroup('collection', entry);
          const asset = response.find(
            (asset) => asset.ownership?.owner === user?.mainWallet,
          );
          if (asset) {
            console.log(`${user?.id} in response, doing nothing...`);
          }
          if (!asset) {
            console.log(`${user?.id} not in response, removing...`);
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
