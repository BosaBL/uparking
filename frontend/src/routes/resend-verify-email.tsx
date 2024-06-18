import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Logo } from '../assets/logo';
import { APIS } from '../constants';

type ResendEmailFormT = {
  email: string;
};

function Component() {
  const toast = useToast();
  const url = new URL('registration/resend-email/', APIS.auth).toString();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<ResendEmailFormT>();

  const resendEmail = (values: ResendEmailFormT) => {
    axios
      .post(url, { ...values })
      .then(onOpen)
      .catch(() =>
        toast({
          status: 'error',
          description: 'Ha ocurrido un error inesperado, intente de nuevo.',
        })
      );
  };

  return (
    <>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack alignItems="center" gap="6">
              <Icon as={CheckCircleIcon} color="green.500" boxSize="16" />
              <Heading size="md">
                Se ha enviado el correo de verificación!, ya puedes cerrar esta
                página.
              </Heading>
            </Stack>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx="auto" maxW="xl" py={12} px={6}>
          <Stack align="center">
            <Box width="100%">
              <Logo color="var(--chakra-colors-blue-600)" />
            </Box>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.600')}
            boxShadow="lg"
            p={8}
          >
            <form onSubmit={handleSubmit(resendEmail)}>
              <Stack alignItems="center" gap="4">
                <Heading fontSize="xl">
                  ¿No has recibido el correo de verificación?
                </Heading>
                <FormControl isRequired>
                  <FormLabel>Correo de Confirmación</FormLabel>
                  <Input
                    type="email"
                    autoComplete="off"
                    placeholder="Ingresa tu correo"
                    required
                    {...register('email')}
                  />
                </FormControl>
                <Button w="100%" type="submit" colorScheme="blue">
                  Reenviar Correo
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export const Route = createFileRoute('/resend-verify-email')({
  component: Component,
});
