import {
  AspectRatio,
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
import { createFileRoute } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import DrawableMapComponent from '../../components/map/DrawableMapComponent';

function Component() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent display="flex" flex="1 0 auto" className="contenttt">
          <ModalHeader>Añadir Nuevo Estacionamiento</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="asdda" pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
            <APIProvider apiKey="AIzaSyBBLeLuoqQfdGl8kIqsDcTzo-2fDmI8LG4">
              <AspectRatio>
                <DrawableMapComponent />
              </AspectRatio>
            </APIProvider>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Component;

export const Route = createFileRoute('/_admin/admin/estacionamientos')({
  component: Component,
});
