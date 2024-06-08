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
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { loginRequest } from '../../api/auth';
import { LoginFormData } from './types';
import { useAuthStore } from '../../stores/auth';

export default function Login() {
  const navigate = useNavigate();
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
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();

  const onSubmit = async (values: LoginFormData) => {
    try {
      const response = await loginRequest(values.email, values.password);

      logout();
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      setUserData(response.data.user);
      setIsisAuthenticated(true);

      if (response.data.user.rol === 'admin') {
        navigate({ to: '/admin' });
      } else {
        navigate({ to: '/' });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          setError('root.serverError', {
            type: err.response.status.toString(),
            message: 'Credenciales incorrectas, revise bien.',
          });
        }
      }
    }
  };

  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Heading fontSize="2xl">Ingresa a tu cuenta</Heading>
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
              <Stack spacing={4}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox>Recuérdame</Checkbox>
                  <ChakraLink
                    as={Link}
                    to="/auth/forgotpassword"
                    color="blue.500"
                    style={{ textDecoration: 'underline' }}
                  >
                    Olvidaste tu contraseña?
                  </ChakraLink>
                </Stack>
                <Text>
                  No tienes una cuenta?{' '}
                  <ChakraLink
                    as={Link}
                    to="/auth/register"
                    color="blue.500"
                    style={{ textDecoration: 'underline' }}
                  >
                    regístrate
                  </ChakraLink>
                </Text>{' '}
                {errors.root?.serverError && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>
                      {errors.root?.serverError.message}
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                >
                  Ingresar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt="Login Image"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
        />
      </Flex>
    </Stack>
  );
}
