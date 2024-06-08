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
  Alert,
  useColorModeValue,
  AlertIcon,
  AlertDescription,
  InputGroup,
  InputRightElement,
  Text,
  Box,
  Colors,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { loginRequest } from '../../api/auth';
import { LoginFormData } from './types';
import { useAuthStore } from '../../stores/auth';
import { Logo } from '../../assets/logo';

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
                  <Text color="blue.600">Olvidaste tu contraseña?</Text>
                </Stack>
                <Stack spacing={2}>
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
                    variant="solid"
                    bg="blue.600"
                    color="white"
                    _hover={{
                      bg: 'blue.700',
                    }}
                  >
                    Sign in
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
