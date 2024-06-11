import { useRef, useState } from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import zxcvbn from 'zxcvbn';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormType, registerRequest } from '../../api/auth';
import { Logo } from '../../assets/logo';
import { checkRut } from '../../utils/rut';
import PasswordStrengthBar from './PasswordStrength';
import useUpdatableToast from '../hooks/useUpdatableToast';
import { AxiosError } from 'axios';

export default function Register() {
  const { addToast, updateToast } = useUpdatableToast(5000, true);

  const validationSchema = z
    .object({
      firstName: z.string().refine((value) => /^[a-z ,.'-]+$/i.test(value), {
        message: 'No pueden haber números, símbolos ni acentos.',
      }),
      lastName: z.string().refine((value) => /^[a-z ,.'-]+$/i.test(value), {
        message: 'No pueden haber números, símbolos ni acentos.',
      }),
      rut: z.string().refine((value) => checkRut(value), {
        message: 'Rut inválido, asegurese de poner el digito verificador.',
      }),
      email: z.string().email({ message: 'Email inválido.' }),
      password: z.string().refine((value) => zxcvbn(value).score >= 3),
      repeat_password: z.string(),
    })
    .refine((data) => data.password === data.repeat_password, {
      message: 'Las contraseñas no coinciden.',
      path: ['repeat_password'],
    });

  type SchemaProps = z.infer<typeof validationSchema>;

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({ resolver: zodResolver(validationSchema) });

  const password = useWatch({ control, name: 'password' });
  const onSubmit = async (values: SchemaProps) => {
    try {
      const [pNombre, ...sNombre] = values.firstName.split(' ');
      const [pApellido, ...sApellido] = values.lastName.split(' ');
      const formData: RegisterFormType = {
        rut: values.rut,
        p_nombre: pNombre,
        s_nombre: Array.isArray(sNombre) ? sNombre.join(' ') : sNombre,
        p_apellido: pApellido,
        s_apellido: Array.isArray(sApellido) ? sApellido.join(' ') : sApellido,
        email: values.email,
        password1: values.password,
        password2: values.repeat_password,
      };
      addToast({
        status: 'loading',
        title: 'Registrando',
        description: 'Estamos registrando tu cuenta.',
      });
      await registerRequest(formData);
      updateToast({
        status: 'success',
        title: 'Genial!',
        description: 'Te has registrado correctamente.',
      });
      navigate({ to: '/' });
    } catch (err) {
      const error = err as AxiosError;
      const rutError = error?.response.data.rut as string;
      const emailError = error?.response.data.rut as string;
      updateToast({
        status: 'error',
        title: 'Error',
        description: 'Hubo un error al registrarte.',
      });
      if (rutError) {
        setError('rut', {
          type: 'server',
          message: 'Este RUT ya se encuentra registrado.',
        });
      }
      if (emailError) {
        setError('email', {
          type: 'server',
          message: 'Este email ya se encuentra registrado.',
        });
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
      <Stack spacing={4} mx="auto" maxW="xl" w="xl" px={6}>
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
          <Heading fontSize="2xl" pb={8}>
            Regístrate
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Stack direction={['column', 'row']}>
                <Box w="100%">
                  <FormControl
                    isInvalid={Boolean(errors?.firstName?.message)}
                    id="firstName"
                    isRequired
                  >
                    <FormLabel>Nombres</FormLabel>
                    <Input
                      type="text"
                      placeholder="john trevor"
                      {...register('firstName')}
                    />
                    <FormErrorMessage>
                      {errors?.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w="100%">
                  <FormControl
                    isInvalid={Boolean(errors?.lastName?.message)}
                    id="lastName"
                    isRequired
                  >
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      type="text"
                      placeholder="doe smith"
                      {...register('lastName')}
                    />
                    <FormErrorMessage>
                      {errors?.lastName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Stack>
              <FormControl isInvalid={Boolean(errors?.rut)} id="rut" isRequired>
                <FormLabel>RUT</FormLabel>
                <Input placeholder="12.456.789-k" {...register('rut')} />
                <FormErrorMessage>{errors?.rut?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.email)}
                id="email"
                isRequired
              >
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="jonhdoe@domino.cl"
                  type="email"
                  {...register('email')}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors?.password)} id="password">
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
                </InputGroup>{' '}
                <FormErrorMessage>
                  La contraseña debe ser al menos de nivel Fuerte.
                </FormErrorMessage>
                <PasswordStrengthBar
                  scoreWords={[
                    'Debil',
                    'Debil',
                    'Buena',
                    'Fuerte',
                    'Muy Fuerte',
                  ]}
                  shortScoreWord="Muy corta"
                  password={password}
                />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors?.repeat_password)}
                id="repeat_password"
              >
                <FormLabel>Repita su contraseña</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="contraseña"
                    type="password"
                    {...register('repeat_password')}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.repeat_password?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
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
                    Registrarme
                  </Button>
                  <Text>
                    Ya tienes una cuenta?{' '}
                    <ChakraLink
                      as={Link}
                      to="/auth/register"
                      color="blue.600"
                      style={{ textDecoration: 'underline' }}
                    >
                      Ingresa
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
