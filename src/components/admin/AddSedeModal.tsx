import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { SedeT } from './sedes.d';
import { capitalizeFirstLetter } from '../../utils/rut';

export default function AddSedeModal(fields: SedeT) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Button w="100%" mt="5" colorScheme="green" onClick={onOpen}>
        Añadir
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody pb={6}>
              {Object.keys(fields).map((field, index) => {
                if (index === 0) {
                  return (
                    <FormControl key={field} mt={4}>
                      <FormLabel>{capitalizeFirstLetter(field)}</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder={capitalizeFirstLetter(field)}
                      />
                    </FormControl>
                  );
                }
                return (
                  <FormControl key={field} mt={4}>
                    <FormLabel>{capitalizeFirstLetter(field)}</FormLabel>
                    <Input placeholder={capitalizeFirstLetter(field)} />
                  </FormControl>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Agregar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
