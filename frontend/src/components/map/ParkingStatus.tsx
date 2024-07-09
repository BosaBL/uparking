import {
  As,
  Button,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Polygon } from './Polygon';
import { Estacionamiento } from './types';
import { getLatLngFromArray } from './utils';

function Estado({
  color,
}: {
  color: { stroke: string; fill: string; text: string; icon: As };
}) {
  return (
    <>
      <HStack textColor={color.stroke} spacing="4">
        <Heading fontSize="xl">Estado</Heading>
        <Icon boxSize={6} as={color.icon} />
      </HStack>
      <Text textColor={color.stroke}>{color.text}</Text>
    </>
  );
}

export default function ParkingStatus({
  estacionamiento,
  color,
  centroid,
}: {
  estacionamiento: Estacionamiento;
  color: {
    stroke: string;
    fill: string;
    text: string;
    icon: As;
  };
  centroid: google.maps.LatLng;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AdvancedMarker position={centroid} onClick={onOpen}>
        <Pin
          borderColor={color.fill}
          glyphColor="white"
          background={color.fill}
        />
      </AdvancedMarker>
      <Polygon
        onClick={onOpen}
        paths={getLatLngFromArray(estacionamiento.area_espacio.coordinates[0])}
        strokeColor={color.stroke}
        fillColor={color.fill}
        strokeWeight={1.25}
      />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            ({estacionamiento.id}) Estacionamiento {estacionamiento.nombre}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="stretch">
              <Estado color={color} />
              <HStack spacing="4">
                <Heading fontSize="xl">
                  Capacidad Disponible:{' '}
                  {estacionamiento.capacidad_max - estacionamiento.capacidad}
                </Heading>
              </HStack>
              <HStack spacing="4">
                <Heading fontSize="xl">
                  Capacidad Ocupada: {estacionamiento.capacidad}
                </Heading>
              </HStack>
              <HStack spacing="4">
                <Heading fontSize="xl">
                  Capacidad Máxima: {estacionamiento.capacidad}
                </Heading>
              </HStack>
            </VStack>
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
