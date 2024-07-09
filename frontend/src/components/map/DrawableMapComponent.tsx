import {
  AdvancedMarker,
  ControlPosition,
  Map,
  MapControl,
  Pin,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import { Box, Stack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { Polygon } from './Polygon';
import { Estacionamiento } from './types';
import { UndoRedoControl } from './undo-redo-control';
import { useDrawingManager } from './use-drawing-manager';
import {
  getLatLngFromArray,
  getLatLngFromPolygon,
  getTreshholdColor,
} from './utils';

type DrawableMapComponentProps = {
  defaultZoom?: number;
  maxZoom?: number;
  minZoom?: number;
  defaultCenter?: google.maps.LatLngLiteral;
  onAction: Dispatch<SetStateAction<google.maps.LatLngLiteral[] | null>>;
  dataArray: Estacionamiento[];
};

function DrawableMapComponent({
  defaultZoom = 18,
  maxZoom = 19.5,
  minZoom = 17.5,
  defaultCenter = { lat: -40.58718881060938, lng: -73.08907589274496 },
  onAction,
  dataArray,
}: DrawableMapComponentProps) {
  const drawingManager = useDrawingManager();
  const coreLib = useMapsLibrary('core');

  if (drawingManager) {
    drawingManager.addListener('polygoncomplete', (e: google.maps.Polygon) => {
      onAction(getLatLngFromPolygon(e));
      drawingManager.setOptions({ drawingControl: false });
    });
  }

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
                <AdvancedMarker position={centroid}>
                  <Pin
                    borderColor={colors.fill}
                    glyphColor="white"
                    background={colors.fill}
                  />
                </AdvancedMarker>
                <Polygon
                  paths={getLatLngFromArray(el.area_espacio.coordinates[0])}
                  strokeColor={colors.stroke}
                  fillColor={colors.fill}
                  strokeWeight={1.25}
                />
              </Box>
            );
          })}
      </Map>

      <MapControl position={ControlPosition.BOTTOM_CENTER}>
        <UndoRedoControl onAction={onAction} drawingManager={drawingManager} />
      </MapControl>
    </Stack>
  );
}

export default DrawableMapComponent;
