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
  useToast,
} from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { capitalizeFirstLetter } from '../../utils/rut';
import { addSedeRequest } from './api';
import { SedeT } from './sedes.d';

export default function AddSedeModal(fields: SedeT) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset } = useForm<SedeT>({});
  const { invalidate } = useRouter();

  const { onChange, onBlur, name, ref } = register('id');

  const keys = Object.keys(fields) as (keyof SedeT)[];

  function onSubmit(sede: SedeT) {
    toast.closeAll();
    const sederq = addSedeRequest(sede);

    toast.promise(sederq, {
      success: {
        title: `Se añadió el elemento ${sede.id}.`,
        isClosable: true,
      },
      error: {
        title: `Ha ocurrido un error al tratar de añadir el elemento ${sede.id}.`,
        isClosable: true,
      },
      loading: {
        title: `Elemento ${sede.id} añadido...`,
        isClosable: true,
      },
    });

    sederq
      .then(() => {
        reset();
        onClose();
      })
      .catch(() => {
        reset();
      })
      .finally(invalidate);
  }

  return (
    <>
      <Button w="100%" mt="5" colorScheme="green" onClick={onOpen}>
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
              {keys.map((field, index) => {
                if (index === 0) {
                  return (
                    <FormControl isRequired key={field} mt={4}>
                      <FormLabel>{capitalizeFirstLetter(field)}</FormLabel>
                      <Input
                        placeholder={capitalizeFirstLetter(field)}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={(el) => {
                          ref(el);
                          if (initialRef.current !== null) {
                            initialRef.current = el;
                          }
                        }}
                      />
                    </FormControl>
                  );
                }
                return (
                  <FormControl key={field} mt={4}>
                    <FormLabel>{capitalizeFirstLetter(field)}</FormLabel>
                    <Input
                      placeholder={capitalizeFirstLetter(field)}
                      {...register(field)}
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
