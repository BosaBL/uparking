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
import { UndoRedoControl } from './undo-redo-control';
import { useDrawingManager } from './use-drawing-manager';
import { getLatLngFromPolygon } from './utils';

const pol = [
  {
    key: 1,
    polygon: [
      {
        lat: -40.58659333106507,
        lng: -73.08928054998279,
      },
      {
        lat: -40.586764433194915,
        lng: -73.0892993254459,
      },
      {
        lat: -40.586835725619835,
        lng: -73.08843297193408,
      },
      {
        lat: -40.58666258674179,
        lng: -73.08840614984393,
      },
    ],
  },
  {
    key: 2,
    polygon: [
      {
        lat: -40.58652916765352,
        lng: -73.08926982114673,
      },
      {
        lat: -40.586380471256795,
        lng: -73.08925372789264,
      },
      {
        lat: -40.58645583796495,
        lng: -73.08833909461856,
      },
      {
        lat: -40.58651287217412,
        lng: -73.08828545043826,
      },
      {
        lat: -40.58661268192313,
        lng: -73.08834982345462,
      },
    ],
  },
];

type MapComponentProps = {
  defaultZoom?: number;
  maxZoom?: number;
  minZoom?: number;
  defaultCenter?: google.maps.LatLngLiteral;
  onAction: Dispatch<SetStateAction<google.maps.LatLngLiteral[] | null>>;
};

function MapComponent({
  defaultZoom = 18,
  maxZoom = 19.5,
  minZoom = 17.5,
  defaultCenter = { lat: -40.58718881060938, lng: -73.08907589274496 },
  onAction,
}: MapComponentProps) {
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
          pol.map((el) => {
            const bounds = new coreLib.LatLngBounds();

            el.polygon.forEach((coord) => bounds.extend(coord));

            const centroid = bounds.getCenter();

            return (
              <Box key={el.key}>
                <AdvancedMarker
                  onClick={() => console.log(el.key)}
                  position={centroid}
                >
                  <Pin
                    borderColor="green"
                    glyphColor="white"
                    background="green"
                  />
                </AdvancedMarker>
                <Polygon
                  paths={el.polygon}
                  onClick={() => console.log(el.key)}
                  strokeColor="#22543D"
                  fillColor="#48BB78"
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

export default MapComponent;
