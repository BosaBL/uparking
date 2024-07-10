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
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { APIS, MAP_API_KEY } from '../../constants';
import authApiWithBearer from '../../libs/axiosAuthBearer';
import { capitalizeFirstLetter } from '../../utils/rut';
import { SedeT } from '../admin/sedes/sedes';
import useUpdatableToast from '../hooks/useUpdatableToast';
import DrawableMapComponent from './DrawableMapComponent';
import { Estacionamiento } from './types';
import { getLatLngArray } from './utils';

function CreateEstaciSedeTonamientoModal({
  columns,
  sedes,
  dataArray,
}: {
  columns: Array<ColumnDef<Estacionamiento> & { form: string }>;
  sedes: SedeT[];
  dataArray: Estacionamiento[];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset } = useForm<
    Omit<Estacionamiento, 'area_espacio'>
  >({});
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const { invalidate } = useRouter();

  const [polygonCoords, setPolygonCoords] = useState<
    google.maps.LatLngLiteral[] | null
  >(null);

  const { onChange, onBlur, name, ref } = register('id');

  const onSubmit = async (data: Omit<Estacionamiento, 'area_espacio'>) => {
    addToast({ status: 'loading', description: 'Creando estacionamiento.' });
    if (!polygonCoords) {
      updateToast({
        status: 'error',
        description: 'No has designado un estacionamiento.',
      });
      return;
    }

    if (dataArray.filter((el) => data.id === el.id).length) {
      updateToast({
        status: 'error',
        description: `El estacionamiento con código ${data.id} ya existe.`,
      });
      return;
    }

    try {
      const url = new URL('estacionamientos/', APIS.admin).toString();
      await authApiWithBearer.post(url, {
        ...data,
        area_espacio: {
          type: 'Polygon',
          coordinates: getLatLngArray(polygonCoords),
        },
      });
      updateToast({
        status: 'success',
        description: 'Se ha añadido el estacionamiento.',
      });
    } catch {
      updateToast({
        status: 'error',
        description: 'Ha ocurrido un error inesperado.',
      });
    } finally {
      onClose();
      setPolygonCoords(null);
      invalidate();
      reset();
    }
  };
  return (
    <>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        Añadir
      </Button>

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
          <ModalHeader>Añadir Estacionamiento</ModalHeader>
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
                            dataArray={dataArray}
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
export default CreateEstaciSedeTonamientoModal;
