import { useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Text,
  Box,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { loginRequest } from '../../api/auth';
import { LoginFormData } from './types';
import { useAuthStore } from '../../stores/auth';
import { Logo } from '../../assets/logo';
import useUpdatableToast from '../hooks/useUpdatableToast';

export default function Login() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/auth/login' }) as {
    redirect?: string;
  };

  const { addToast, updateToast } = useUpdatableToast(5000, true);
  const {
    setAccessToken,
    setRefreshToken,
    setUserData,
    logout,
    setIsisAuthenticated,
  } = useAuthStore();
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (values: LoginFormData) => {
    try {
      addToast({
        status: 'loading',
        title: 'Iniciadon sesión',
        description: 'Validando credenciales...',
      });
      const response = await loginRequest(values.email, values.password);
      logout();
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      setUserData(response.data.user);
      setIsisAuthenticated(true);

      updateToast({
        status: 'success',
        title: 'Sesión iniciada',
        description: 'Bienvenido de vuelta',
      });

      if (searchParams?.redirect) {
        navigate({ to: searchParams.redirect, replace: true });
      } else {
        navigate({ to: '/', replace: true });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          updateToast({
            status: 'error',
            title: 'Error',
            description: 'Credenciales inválidas',
          });
        }
      }
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Ingresa a tu cuenta</Heading>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="jonhdoe@domino.cl"
                  type="email"
                  {...register('email')}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="contraseña"
                    type={show ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputRightElement onClick={() => setShow(!show)}>
                    <Button>{show ? <ViewIcon /> : <ViewOffIcon />}</Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox>Recordar</Checkbox>
                </Stack>
                <Stack spacing={2}>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    variant="solid"
                    bg="blue.600"
                    color="white"
                    _hover={{
                      bg: 'blue.700',
                    }}
                  >
                    Ingresar
                  </Button>
                  <Text>
                    No tienes una cuenta?{' '}
                    <ChakraLink
                      as={Link}
                      to="/auth/register"
                      color="blue.600"
                      style={{ textDecoration: 'underline' }}
                    >
                      regístrate
                    </ChakraLink>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
