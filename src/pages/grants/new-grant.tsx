import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  Container,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { addDays } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import GrantStepOne from '~/components/pages/grants/create-grant/GrantStepOne';
import { connection, createRoundIx } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

registerLocale('en-gb', enGB);

const CreateGrantRound = () => {
  const toast = useToast();
  const router = useRouter();
  const tomorrow = addDays(new Date(), 1);
  const anchorWallet = useAnchorWallet();
  const [endDate, setEndDate] = useState(tomorrow);
  const [startDate, setStartDate] = useState(tomorrow);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createRoundMutation = trpc.round.create.useMutation();
  const [transactionError, setTransactionError] = useState(null);
  const [signTransactionLoading, setSignTransactionLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const createRound = async (
    name: string,
    pool: string,
    project: string,
    colorScheme: string,
    description: string,
    start: moment.Moment | null,
    end: moment.Moment | null
  ) => {
    try {
      const ts = await getSession();

      console.log(ts);

      const ix = await createRoundIx(
        anchorWallet as NodeWallet,
        name,
        parseInt(pool),
        parseInt(project)
      );
      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new anchor.web3.Transaction();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix as anchor.web3.TransactionInstruction);
      const signed = await anchorWallet?.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signed!.serialize());
      if (!txid) {
        throw new Error('txid is null');
      }
      const createdRound = createRoundMutation.mutate({
        matchingPool: parseInt(pool),
        name: name,
        notionPage: 'https://www.notion.so/round1',
        projectCount: parseInt(project),
        tx: txid,
        colorScheme: colorScheme,
        short_description: description,
        startTime: start?.toISOString() as string,
        endtime: end?.toISOString() as string,
      });
      onClose();
    } catch (error: any) {
      setTransactionError(error.message || 'Error while signing transaction');
    }
  };

  const onSubmit = async () => {
    onOpen();
  };

  const onSignTransaction = async () => {
    setSignTransactionLoading(true);
    try {
      const startMoment = moment(startDate);
      const endMoment = moment(endDate);
      createRound(
        getValues().name,
        getValues().pool,
        getValues().projects,
        getValues().colorScheme,
        getValues().short_description,
        startMoment,
        endMoment
      );
    } catch (error: any) {
      setTransactionError(error.message || 'there was an error');
    } finally {
      setSignTransactionLoading(false);
    }
  };

  return (
    <Container
      transition="all .25s ease"
      maxW="full"
      px={{ base: '1rem', sm: '1rem', md: '1rem', lg: '1rem' }}
      py={{ base: '2rem', md: '3rem' }}
    >
      <Card
        maxW="7xl"
        align="start"
        mx="auto"
        padding={{ base: '24px', md: '40px' }}
      >
        <GrantStepOne
          onSubmit={onSubmit}
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
        />
      </Card>
      <Modal variant={'cubik'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Box
                as="p"
                textStyle={{ base: 'title3', md: 'title2' }}
                color="neutral.11"
              >
                Approve from Wallet
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack pt="16px" align={'start'} gap="16px">
              <Box
                as="p"
                textStyle={{ base: 'body5', md: 'body3' }}
                color="white"
              >
                Sign the transaction to create a grant round
              </Box>
              {transactionError && (
                <Alert status="error" variant="cubik">
                  <AlertIcon />
                  <AlertDescription
                    fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                    lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
                  >
                    {transactionError}
                  </AlertDescription>
                </Alert>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button w="8rem" variant="close_modal" onClick={() => {}}>
              Cancel
            </Button>
            <Button
              px="32px"
              variant="apply_for_grant"
              onClick={onSignTransaction}
              isLoading={signTransactionLoading}
            >
              Sign Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default CreateGrantRound;
