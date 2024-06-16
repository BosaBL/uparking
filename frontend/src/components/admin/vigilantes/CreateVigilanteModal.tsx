import {
  Button,
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
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useUpdatableToast from '../../hooks/useUpdatableToast';
import { CreateModalPropsT } from '../modals.d';
import UserSearchBar from './UserSearchBar';
import { VigilanteSimpleT } from './vigilantes';

export default function CreateVigilanteModal({
  handleCreate,
}: CreateModalPropsT<VigilanteSimpleT>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const [selected, setSelected] = useState<VigilanteSimpleT | null>(null);
  const { invalidate } = useRouter();

  const handleClose = () => {
    setSelected(null);
    onClose();
  };

  const { handleSubmit } = useForm();

  const onCreate = async () => {
    clearToasts();
    addToast({
      status: 'loading',
      description: 'Se está agregando el vigilante.',
    });
    if (!selected) {
      updateToast({
        status: 'error',
        description: 'Debes seleccionar un usuario.',
      });
      return;
    }
    try {
      await handleCreate(selected);
      onClose();
      updateToast({
        status: 'success',
        description: 'Se ha añadido un nuevo vigilante.',
      });
    } catch {
      onClose();
      updateToast({
        status: 'error',
        description: 'Ha ocurrido un error inesperado.',
      });
    } finally {
      invalidate();
    }
  };
  return (
    <>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        Añadir
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        initialFocusRef={initialRef}
        size="lg"
        isCentered
      >
        <ModalOverlay />
        <ModalContent m="4" maxH="100%">
          <ModalHeader>Añadir Vigilante</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onCreate)}>
            <ModalBody pb={6}>
              <UserSearchBar
                selected={selected}
                setSelected={setSelected}
                initialRef={initialRef}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Agregar
              </Button>
              <Button
                onClick={() => {
                  setSelected(null);
                  invalidate();
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
