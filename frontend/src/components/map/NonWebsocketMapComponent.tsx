import {
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import { Box, Stack } from '@chakra-ui/react';
import { Polygon } from './Polygon';
import { Estacionamiento } from './types';
import { getLatLngFromArray, getTreshholdColor } from './utils';

type NonDrawableMapComponentProps = {
  defaultZoom?: number;
  maxZoom?: number;
  minZoom?: number;
  defaultCenter?: google.maps.LatLngLiteral;
  dataArray: Estacionamiento[];
};

function NonWebsockerMapComponents({
  defaultZoom = 18,
  maxZoom = 19.5,
  minZoom = 17.5,
  defaultCenter = { lat: -40.58718881060938, lng: -73.08907589274496 },
  dataArray,
}: NonDrawableMapComponentProps) {
  const map = useMap();
  const coreLib = useMapsLibrary('core');

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
        minZoom={minZoom}
        mapId="d1d387488b4410d4"
        defaultCenter={defaultCenter}
        gestureHandling="greedy"
      // disableDefaultUI
      >
        {coreLib &&
          map &&
          dataArray &&
          dataArray.map((el) => {
            const bounds = new coreLib.LatLngBounds();
            getLatLngFromArray(el.area_espacio.coordinates[0]).forEach(
              (coord) => bounds.extend(coord)
            );
            const colors = getTreshholdColor(el);
            const centroid = bounds.getCenter();
            map.setCenter(centroid);
            return (
              <Box key={el.id}>
                <AdvancedMarker position={centroid}>
                  <Pin
                    borderColor={colors.fill}
                    glyphColor="white"
                    background={colors.fill}
                  />
                </AdvancedMarker>
                <Polygon
                  paths={getLatLngFromArray(el.area_espacio.coordinates[0])}
                  onClick={() => console.log(el.id)}
                  strokeColor={colors.stroke}
                  fillColor={colors.fill}
                  strokeWeight={1.25}
                />
              </Box>
            );
          })}
      </Map>
    </Stack>
  );
}

export default NonWebsockerMapComponents;
