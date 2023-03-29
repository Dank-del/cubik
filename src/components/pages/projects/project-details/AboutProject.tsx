import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { Key, useRef } from 'react';
import {
  FaDiscord,
  FaGithub,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { HiLink } from 'react-icons/hi';
import CustomTag from '~/components/common/tags/CustomTag';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { projectType } from '~/types/project';
import { formatNumberWithK } from '~/utils/formatWithK';
import { getDomain } from '~/utils/getDomain';
import { ProjectDonationSimulator } from './project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';
import { ProjectsTabs } from './ProjectTabs';

type MobileDrawerTypes = {
  logo: string;
  projectName: string;
  walletAddress: string;
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
};

const MobileDrawer = ({
  logo,
  projectName,
  walletAddress,
  isOpen,
  onClose,
  btnRef,
}: MobileDrawerTypes) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
      variant="cubik"
    >
      <DrawerOverlay />
      <DrawerContent pt="0">
        <DrawerCloseButton top="28px" backgroundColor="none" />
        <DrawerHeader p="16px" roundedTop={'16px'} backgroundColor="black">
          <HStack>
            <Avatar src={logo} size="md" />
            <VStack gap="0" align={'start'}>
              <Box as="p" textStyle={'title3'} lineHeight="16px">
                {projectName}
              </Box>
              <WalletAddress walletAddress={walletAddress} size={'sm'} />
            </VStack>
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          <ProjectDonationSimulator
            cta={'Proceed to pay'}
            height={80}
            width={120}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const ProjectLink = ({ urlName }: { urlName: string }) => {
  switch (urlName) {
    case 'url':
      return <HiLink color="#E0FFFD" size={18} />;
    case 'twitter':
      return <FaTwitter color="#E0FFFD" size={18} />;
    case 'discord':
      return <FaDiscord color="#E0FFFD" size={18} />;
    case 'telegram':
      return <FaTelegramPlane color="#E0FFFD" size={18} />;
    case 'youtube':
      return <FaYoutube color="#E0FFFD" size={18} />;
    case 'github':
      return <FaGithub color="#E0FFFD" size={18} />;
    default:
      return <></>;
  }
};

export const AboutProject = ({
  projectDetails,
}: {
  projectDetails: projectType;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const industry = projectDetails.industry;
  const socials = projectDetails.socials;
  return (
    <Container
      maxW="6xl"
      display={'flex'}
      p="0"
      flex="3"
      flexDir={{ base: 'column', lg: 'column' }}
      alignItems={{ base: 'end', md: 'center' }}
      justifyContent="start"
      gap={{ base: '24px', md: '64px' }}
    >
      <Stack
        direction={{ base: 'column', md: 'column' }}
        gap={{ base: '0.5rem', md: '1rem' }}
        width={'100%'}
      >
        <HStack justify={{ base: 'space-between', md: 'start' }} align="center">
          <Avatar src={projectDetails.logo} size="xl" />
          <VStack
            display={{ base: 'flex', md: 'none' }}
            ml="auto"
            right="20rem"
            w={'fit-content'}
            alignItems={{ base: 'center', md: 'start' }}
          >
            <VStack align={'end'} gap="0" spacing="0" pb="0.5rem">
              <Box as="p" textStyle={{ base: 'headline4', md: 'display3' }}>
                {formatNumberWithK(
                  Number(((projectDetails.usd_total as number) * 19).toFixed(2))
                )}
                $
              </Box>
              <Box
                as="p"
                textStyle={{ base: 'body3', md: 'body2' }}
                color="#B2B2B2"
              >
                Funds Raised
              </Box>
            </VStack>
          </VStack>
        </HStack>
        <HStack gap="1rem">
          <Box
            as="p"
            textStyle={{ base: 'headline4', md: 'headline3' }}
            textTransform="capitalize"
            color="neutral.11"
          >
            {projectDetails.project_name}
          </Box>
          <Wrap flexDirection={'row'} spacing="0.4rem" pt="0.5rem">
            {industry.map((tag: any, key: React.Key | null | undefined) => {
              return (
                <CustomTag color={tag.label} key={key}>
                  {tag.label}
                </CustomTag>
              );
            })}
          </Wrap>
        </HStack>
        <Box
          as="p"
          textStyle={{ base: 'body3', md: 'body2' }}
          color="neutral.9"
        >
          {projectDetails.short_description}
        </Box>
        <HStack>
          <Button
            variant="unstyled"
            display={'flex'}
            alignItems="center"
            rounded="full"
            color="brand.teal6"
            backgroundColor="brand.teal2"
            p={{ base: '0.5rem 0.8rem', md: '0.2rem 1rem' }}
            iconSpacing={{ base: '0.3rem', md: '0.4rem' }}
            leftIcon={<ProjectLink urlName={'url'} />}
            _hover={{
              backgroundColor: 'brand.teal3',
            }}
            as="a"
            href={projectDetails.project_link}
            target="_blank"
          >
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body4' }}
              color="brand.teal.6"
              pb="0.1rem"
            >
              {getDomain(projectDetails.project_link)}
            </Box>
          </Button>
          {socials.map((link: { name: string; url: string }, key: Key) => (
            <IconButton
              aria-label={link.name}
              variant={'unstyled'}
              fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
              display="flex"
              alignItems={'center'}
              rounded="full"
              color="brand.teal6"
              backgroundColor="brand.teal2"
              key={key}
              icon={<ProjectLink urlName={link.name} />}
              _hover={{
                backgroundColor: 'brand.teal3',
              }}
              as="a"
              href={link.name}
              target="_blank"
            />
          ))}
        </HStack>
      </Stack>
      <Center w="full" display={{ base: 'flex', md: 'none' }}>
        <Button
          onClick={onOpen}
          w="full"
          fontSize={'16px'}
          variant="connect_wallet"
        >
          Donate
        </Button>
      </Center>
      <MobileDrawer
        logo={projectDetails.logo}
        projectName={projectDetails.project_name}
        walletAddress={projectDetails.owner_publickey}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
      />
      <ProjectsDetailedDescription
        description={projectDetails.long_description}
      />
      <ProjectsTabs />
    </Container>
  );
};
