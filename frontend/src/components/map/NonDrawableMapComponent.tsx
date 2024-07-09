import { Map, useMapsLibrary } from '@vis.gl/react-google-maps';

import { Box, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { APIS, WEBSOCKET } from '../../constants';
import ParkingStatus from './ParkingStatus';
import { Estacionamiento } from './types';
import { getLatLngFromArray, getTreshholdColor } from './utils';

type NonDrawableMapComponentProps = {
  defaultZoom?: number;
  maxZoom?: number;
  minZoom?: number;
  defaultCenter?: google.maps.LatLngLiteral;
};

function NonDrawableMapComponents({
  defaultZoom = 18,
  maxZoom = 19.5,
  minZoom = 17.5,
  defaultCenter = { lat: -40.58718881060938, lng: -73.08907589274496 },
}: NonDrawableMapComponentProps) {
  const coreLib = useMapsLibrary('core');

  const [dataArray, setDataArray] = useState<Estacionamiento[] | null>(null);

  const { lastMessage } = useWebSocket(WEBSOCKET.toString());

  useEffect(() => {
    const fetchEstacionamientos = async () => {
      const url = new URL('estacionamientos/', APIS.user).toString();
      const res = await axios.get(url);

      setDataArray(res.data);
    };
    fetchEstacionamientos();
  }, [setDataArray, lastMessage]);

  return (
    <Stack
      height="100"
      width="100"
      maxH="100%"
      maxW="100%"
      flex="1 0 auto"
      background="gray.100"
    >
      <Map
        defaultZoom={defaultZoom}
        maxZoom={maxZoom}
        disableDefaultUI
        minZoom={minZoom}
        mapId="d1d387488b4410d4"
        defaultCenter={defaultCenter}
        gestureHandling="greedy"
        // disableDefaultUI
      >
        {coreLib &&
          dataArray &&
          dataArray.map((el) => {
            const bounds = new coreLib.LatLngBounds();
            getLatLngFromArray(el.area_espacio.coordinates[0]).forEach(
              (coord) => bounds.extend(coord)
            );
            const colors = getTreshholdColor(el);
            const centroid = bounds.getCenter();
            return (
              <Box key={el.id}>
                <ParkingStatus
                  estacionamiento={el}
                  color={colors}
                  centroid={centroid}
                />
              </Box>
            );
          })}
      </Map>
    </Stack>
  );
}

export default NonDrawableMapComponents;
