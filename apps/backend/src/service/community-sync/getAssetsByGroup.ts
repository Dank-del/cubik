import { AssetsByGroupResponse } from './assets.types';

const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

const getAssetsByGroup = async (groupKey: string, groupValue: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'sync-data',
      method: 'getAssetsByGroup',
      params: {
        groupKey: groupKey,
        groupValue: groupValue,
        page: 1, // Starts at 1
        limit: 1000,
      },
    }),
  });
  const res = (await response.json()) as AssetsByGroupResponse;
  // console.log('res', res);
  let assets = res.result.items;
  let currentPage = 1;
  while (assets.length < res.result.total) {
    currentPage++;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'sync-data',
        method: 'getAssetsByGroup',
        params: {
          groupKey: groupKey,
          groupValue: groupValue,
          page: currentPage,
          limit: 1000,
        },
      }),
    });
    const resp = await response.json();
    const result = (resp as AssetsByGroupResponse).result.items;
    assets = assets.concat(result);
  }
  return assets;
};

export default getAssetsByGroup;
