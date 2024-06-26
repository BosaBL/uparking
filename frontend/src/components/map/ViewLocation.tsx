import {
  AspectRatio,
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
import { APIProvider } from '@vis.gl/react-google-maps';
import { MAP_API_KEY } from '../../constants';
import NonWebsockerMapComponents from './NonWebsocketMapComponent';
import { Estacionamiento } from './types';

function ViewLocation({ dataArray }: { dataArray: Estacionamiento[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Ver Ubicación
      </Button>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Estacionamiento <strong>{dataArray[0].nombre}</strong>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio>
              <APIProvider apiKey={MAP_API_KEY}>
                <NonWebsockerMapComponents dataArray={dataArray} />
              </APIProvider>
            </AspectRatio>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewLocation;
