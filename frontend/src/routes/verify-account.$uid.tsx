import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Logo } from '../assets/logo';
import { APIS } from '../constants';

function Component() {
  const params: { uid: string } = useParams({ from: '/verify-account/$uid' });
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsloading] = useState(true);

  console.log('A');
  useEffect(() => {
    const url = new URL('registration/verify-email/', APIS.auth).toString();
    axios
      .post(url, { key: params.uid })
      .then(() => {
        setIsloading(false);
        toast({
          status: 'success',
          description: 'Tu cuenta ha sido verificada, ya puedes ingresar.',
          isClosable: true,
          duration: 2000,
        });
        navigate({ to: '/auth/login/', replace: true });
      })
      .catch(() => console.log('ops'));
  }, [params, navigate]);

  return (
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
          {isLoading && (
            <Stack alignItems="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.600"
                size="xl"
              />
              <Heading fontSize="3xl">Se está verificando tu cuenta</Heading>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

export const Route = createFileRoute('/verify-account/$uid')({
  component: Component,
});
