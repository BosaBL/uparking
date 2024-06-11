import { useState, usestate } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  Box,
  FormErrorMessage,
  HStack,
  InputGroup,
  InputLeftAddon,
  Button,
} from '@chakra-ui/react';
import {
  Link,
  useLoaderData,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Logo } from '../../assets/logo';
import { checkRut, getVerifierDigit } from '../../utils/rut';
import useUpdatableToast from '../hooks/useUpdatableToast';
import { User } from '../../stores/auth';
import { RegisterFormType, updateUserDataRequest } from '../../api/auth';

export type UserUpdateDataFormType = {
  p_nombre: string;
  s_nombre: string;
  p_apellido: string;
  s_apellido: string;
  telefono: string;
};

export default function UpdateUserDataForm() {
  const { addToast, updateToast } = useUpdatableToast(5000, true);
  const loader = useLoaderData({
    from: '/_home/home/user',
  }) as User;
  const { invalidate } = useRouter();

  const defaultValues = {
    firstName: [loader.p_nombre, loader.s_nombre].join(' '),
    lastName: [loader.p_apellido, loader.s_apellido].join(' '),
    rut: [loader.rut, getVerifierDigit(loader.rut)].join('-'),
    email: loader.email,
    telefono: loader.telefono,
  };

  const validationSchema = z.object({
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
    telefono: z.string(),
  });

  type SchemaProps = z.infer<typeof validationSchema>;

  const [editing, setEditing] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = async (values: SchemaProps) => {
    try {
      addToast({ status: 'loading', title: 'Actualizando datos...' });
      const [pNombre, ...sNombre] = values.firstName.split(' ');
      const [pApellido, ...sApellido] = values.lastName.split(' ');
      const formData: UserUpdateDataFormType = {
        p_nombre: pNombre,
        s_nombre: Array.isArray(sNombre) ? sNombre.join(' ') : sNombre,
        p_apellido: pApellido,
        s_apellido: Array.isArray(sApellido) ? sApellido.join(' ') : sApellido,
        telefono: values.telefono,
      };
      await updateUserDataRequest(formData);
      updateToast({ status: 'success', title: 'Datos actualizados.' });
      invalidate();
      reset({ ...values });
      setEditing(false);
    } catch {
      invalidate();
      updateToast({ status: 'error', title: 'Error al actualizar datos.' });
    }
  };

  return (
    <Flex
      flex="1 0 auto"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={0} mx="auto" maxW="xl" w="xl" py={12} px={6}>
        <HStack alignContent="space-between">
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} width="50%">
            Mis datos
          </Heading>
          <Box width="50%">
            <Logo color="var(--chakra-colors-blue-600)" />
          </Box>
        </HStack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.600')}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Stack direction={['column', 'row']}>
                <Box w="100%">
                  <FormControl
                    isDisabled={!editing}
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
                    isDisabled={!editing}
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
              <FormControl
                isDisabled
                isInvalid={Boolean(errors?.rut)}
                id="rut"
                isRequired
              >
                <FormLabel>RUT</FormLabel>
                <Input placeholder="12.456.789-k" {...register('rut')} />
                <FormErrorMessage>{errors?.rut?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isDisabled
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
              </FormControl>
              <FormControl
                isDisabled={!editing}
                isInvalid={Boolean(errors.email)}
                id="telefono"
                isRequired
              >
                <FormLabel>Teléfono</FormLabel>
                <InputGroup>
                  <InputLeftAddon color={!editing ? 'GrayText' : ''}>
                    +56
                  </InputLeftAddon>
                  <Input
                    placeholder="912345678"
                    type="number"
                    {...register('telefono')}
                  />
                </InputGroup>
              </FormControl>
              <Stack direction={['column', 'row']}>
                <Button
                  onClick={() => {
                    if (!editing) {
                      setEditing(true);
                    } else {
                      handleSubmit(onSubmit)();
                    }
                  }}
                  w="100%"
                >
                  {!editing ? 'Cambiar datos' : 'Guardar cambios'}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
