import {
  Button,
  FormControl,
  FormLabel,
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
import { CreateModalPropsT } from '../modals.d';
import { SedeT } from './sedes.d';

export default function AddSedeModal({
  dataArray,
  columns,
  handleCreate,
}: CreateModalPropsT<SedeT>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset } = useForm<SedeT>({});
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const { invalidate } = useRouter();

  const { onChange, onBlur, name, ref } = register('id');

  const onSubmit = (data: SedeT) => {
    clearToasts();
    addToast({ status: 'loading', description: 'Añadiendo sede...' });
    if (dataArray.filter((el) => data.id === el.id).length) {
      updateToast({
        status: 'error',
        description: `La sede con código ${data.id} ya existe.`,
      });
      return;
    }
    handleCreate(data)
      .then(() => {
        reset();
        updateToast({
          status: 'success',
          description: `La sede código ${data.id} fue agregada.`,
        });
      })
      .catch(() => {
        updateToast({
          status: 'error',
          description: 'Ha ocurrido un error inesperado.',
        });
      })
      .finally(() => {
        invalidate();
        onClose();
      });
  };
  return (
    <>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        Añadir
      </Button>

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
                    <FormControl isRequired key={element.id} mt={4}>
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
