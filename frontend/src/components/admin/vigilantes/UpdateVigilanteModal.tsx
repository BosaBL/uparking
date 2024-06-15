import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { capitalizeFirstLetter } from '../../../utils/rut';
import useUpdatableToast from '../../hooks/useUpdatableToast';
import { UpdateModalPropsT } from '../modals';
import { VigilanteSimpleT } from './vigilantes';

export default function UpdateVigilanteModal({
  data,
  columns,
  handleUpdate,
}: UpdateModalPropsT<VigilanteSimpleT>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
    ...data,
  });
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const { invalidate } = useRouter();

  const { onChange, onBlur, name, ref } = register('id');

  function onSubmit() {
    clearToasts();
    addToast({
      status: 'loading',
      description: 'Se está actualizando el elemento.',
    });
    handleUpdate(data)
      .then(() => {
        updateToast({
          status: 'success',
          description: 'El elemento ha sido actualizado.}',
        });
      })
      .catch(() =>
        updateToast({
          status: 'error',
          description: 'Ha ocurrido un error inesperado.',
        })
      )
      .finally(() => {
        reset();
        invalidate();
        onClose();
      });
  }

  return (
    <>
      <IconButton
        colorScheme="blue"
        aria-label="Editar"
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir Sede</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              {columns.map((element, index) => {
                if (index === 0 && element.id) {
                  return (
                    <FormControl isDisabled isRequired key={element.id} mt={4}>
                      <FormLabel>{capitalizeFirstLetter(element.id)}</FormLabel>
                      <Input
                        placeholder={capitalizeFirstLetter(element.id)}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={(el) => {
                          ref(el);
                          if (el !== null) {
                            initialRef.current = el;
                          }
                        }}
                      />
                    </FormControl>
                  );
                }
                return (
                  <FormControl key={element.id} mt={4}>
                    <FormLabel>{capitalizeFirstLetter(element.id)}</FormLabel>
                    <Input
                      placeholder={capitalizeFirstLetter(element.id)}
                      {...register(element.id as keyof SedeT)}
                    />
                  </FormControl>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Agregar
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
