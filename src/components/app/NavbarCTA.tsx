import { Center, HStack, Skeleton } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import IconButtonBadge from './ListButton';
import UserNavMenu from './navbar-menu/UserNavMenu';

const NavbarCTA: FC = () => {
  const { publicKey, disconnect } = useWallet();

  const { status } = useSession();

  let CTA;

  switch (status) {
    case 'loading':
      CTA = (
        <Skeleton
          isLoaded
          fadeDuration={1}
          rounded={'md'}
          w="8rem"
          height="full"
          startColor="#121219"
          endColor="#37383E"
        />
      );
      break;
    case 'authenticated':
      CTA = (
        <HStack gap={{ base: '2px', md: '16px' }}>
          <>
            <IconButtonBadge />
            <UserNavMenu />
          </>
        </HStack>
      );
      break;
    default:
      CTA = publicKey ? (
        <Center as="button" onClick={disconnect}>
          Connecting...
        </Center>
      ) : (
        <WalletMultiButton />
      );
  }

  return <>{CTA}</>;
};

export default NavbarCTA;
