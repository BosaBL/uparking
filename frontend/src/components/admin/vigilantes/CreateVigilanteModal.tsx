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
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import FullTextSearchBar from '../../FullTextSearchBar';
import useUpdatableToast from '../../hooks/useUpdatableToast';
import { CreateModalPropsT } from '../modals.d';
import { VigilanteSimpleT } from './vigilantes';

export default function CreateVigilanteModal({
  dataArray,
  columns,
  handleCreate,
}: CreateModalPropsT<VigilanteSimpleT>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset } = useForm<VigilanteSimpleT>({});
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const { invalidate } = useRouter();

  const { onChange, onBlur, name, ref } = register('id');

  const onSubmit = (data: VigilanteSimpleT) => {
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
        updateToast({
          status: 'success',
          description: `La sede código ${data.id} fue agregada.`,
        });
      })
      .catch(() => {
        reset();
        invalidate();
        updateToast({
          status: 'error',
          description: 'Ha ocurrido un error inesperado.',
        });
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
          <ModalHeader>Añadir Vigilante</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              asd
              <FullTextSearchBar data={dataArray} />
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
