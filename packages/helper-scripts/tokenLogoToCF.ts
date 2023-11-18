import fs from 'fs';

import { tokenList } from '@cubik/common/tokens';

import { uploadURLsToCloudflare } from './utils/uploadToCloudflare';

async function main() {
  const tokenListWithCloudflareURLs = await Promise.all(
    tokenList.map(async (token) => {
      try {
        const cloudflareResponse = await uploadURLsToCloudflare(
          token.logoURI,
          `token-${token.symbol}`,
        );
        console.log(JSON.stringify(cloudflareResponse));
        if (!cloudflareResponse) {
          return token;
        }
        if (!cloudflareResponse?.success) {
          console.log('error', cloudflareResponse?.errors);
          return token;
        }
        return { ...token, logoURI: cloudflareResponse.result.variants[0] };
      } catch (error) {
        console.log('error', error);
        return token;
      }
    }),
  );

  console.log(tokenListWithCloudflareURLs);
  // dump as json
  fs.writeFileSync(
    'tokenList.json',
    JSON.stringify(tokenListWithCloudflareURLs),
  );
}

main();
