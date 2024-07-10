import { EditIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
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
  Select,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MAP_API_KEY } from '../../constants';
import { capitalizeFirstLetter } from '../../utils/rut';
import { UpdateModalPropsTS } from '../admin/modals';
import useUpdatableToast from '../hooks/useUpdatableToast';
import DrawableMapComponent from './DrawableMapComponent';
import { Estacionamiento, OptEstacionamiento } from './types';
import { getLatLngArray } from './utils';

function UpdateEstacionamientoModal({
  handleUpdate,
  columns,
  data,
  sedes,
}: UpdateModalPropsTS<Estacionamiento>) {
  const { area_espacio: area, ...rest } = data;

  const formData = rest;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: formData,
    ...formData,
  });
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const { invalidate } = useRouter();

  const [polygonCoords, setPolygonCoords] = useState<
    google.maps.LatLngLiteral[] | null
  >(null);

  const { onChange, onBlur, name, ref } = register('id');

  function onSubmit(vals: Omit<Estacionamiento, 'area_espacio'>) {
    const estacionamiento: OptEstacionamiento = polygonCoords
      ? {
          ...vals,
          area_espacio: {
            type: 'Polygon',
            coordinates: getLatLngArray(polygonCoords),
          },
        }
      : { ...vals };
    clearToasts();
    addToast({
      status: 'loading',
      description: 'Se está actualizando el elemento.',
    });
    handleUpdate(estacionamiento as Estacionamiento)
      .then(() => {
        updateToast({
          status: 'success',
          description: 'El elemento ha sido actualizado.',
        });
      })
      .catch(() =>
        updateToast({
          status: 'error',
          description: 'Ha ocurrido un error inesperado.',
        })
      )
      .finally(() => {
        reset(vals);
        invalidate();
        onClose();
      });
  }
  return (
    <>
      <Tooltip label="Editar">
        <IconButton
          colorScheme="blue"
          aria-label="Editar"
          onClick={onOpen}
          icon={<EditIcon />}
        />
      </Tooltip>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPolygonCoords(null);
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizar Estacionamiento</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              {columns.map((element, index) => {
                if (index === 0 && element.id) {
                  return (
                    <FormControl isRequired key={element.id} mt={4} isDisabled>
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
                if (element.id === 'sede') {
                  return (
                    <FormControl isRequired key={element.id} mt={4}>
                      <FormLabel>
                        {capitalizeFirstLetter(element.form)}
                      </FormLabel>
                      <Select
                        colorScheme="blue"
                        placeholder="Seleccione una sede"
                        isRequired
                        {...register('sede')}
                      >
                        {sedes.map((el) => (
                          <option value={el.id} key={el.id}>
                            {el.nombre}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }
                if (element.id === 'area_espacio') {
                  return (
                    <FormControl key={element.id} mt={4} isRequired>
                      <FormLabel>
                        {element?.form && capitalizeFirstLetter(element.form)}
                      </FormLabel>
                      <AspectRatio>
                        <APIProvider apiKey={MAP_API_KEY}>
                          <DrawableMapComponent
                            dataArray={[data]}
                            onAction={setPolygonCoords}
                          />
                        </APIProvider>
                      </AspectRatio>
                    </FormControl>
                  );
                }
                if (
                  element.id === 'capacidad' ||
                  element.id === 'capacidad_max'
                ) {
                  return (
                    <FormControl key={element.id} mt={4} isRequired>
                      <FormLabel>
                        {capitalizeFirstLetter(element.form)}
                      </FormLabel>
                      <Input
                        type="number"
                        step={1}
                        min={0}
                        placeholder={capitalizeFirstLetter(element.form)}
                        {...register(
                          element.id as keyof Omit<
                            Estacionamiento,
                            'area_espacio'
                          >
                        )}
                      />
                    </FormControl>
                  );
                }
                return (
                  <FormControl key={element.id} mt={4} isRequired>
                    <FormLabel>{capitalizeFirstLetter(element.form)}</FormLabel>
                    <Input
                      placeholder={capitalizeFirstLetter(element.form)}
                      {...register(
                        element.id as keyof Omit<
                          Estacionamiento,
                          'area_espacio'
                        >
                      )}
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
                  setPolygonCoords(null);
                }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
export default UpdateEstacionamientoModal;
