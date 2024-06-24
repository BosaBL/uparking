import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps';

import { Stack } from '@chakra-ui/react';
import { Polygon } from './Polygon';
import { UndoRedoControl } from './undo-redo-control';
import { useDrawingManager } from './use-drawing-manager';
import { getLatLngFromPolygon } from './utils';

const pol = [
  {
    lat: -40.586952528090514,
    lng: -73.08942994431331,
  },
  {
    lat: -40.58710326013861,
    lng: -73.08947285965495,
  },
  {
    lat: -40.58713585080701,
    lng: -73.08879157860673,
  },
  {
    lat: -40.58700548803803,
    lng: -73.08877548535365,
  },
  {
    lat: -40.586952528090514,
    lng: -73.08942994431331,
  },
];

const mapStyle = [
  {
    featureType: 'administrative',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        hue: '#0066ff',
      },
      {
        saturation: 75,
      },
      {
        lightness: 100,
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    stylers: [
      {
        saturation: -85,
      },
      {
        lightness: 61,
      },
      {
        visibility: 'off',
      },
      {
        weight: 0.6,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#5f94ff',
      },
      {
        lightness: 26,
      },
      {
        gamma: 5.86,
      },
      {
        visibility: 'simplified',
      },
    ],
  },
];

function MapComponent() {
  const drawingManager = useDrawingManager();

  drawingManager?.addListener('polygoncomplete', (e) => {
    console.log(getLatLngFromPolygon(e));
  });

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
        defaultZoom={18}
        defaultCenter={{ lat: -40.58718881060938, lng: -73.08907589274496 }}
        styles={mapStyle}
        gestureHandling="greedy"
        disableDefaultUI
      >
        <Polygon
          paths={pol}
          strokeColor="#22543D"
          fillColor="#48BB78"
          strokeWeight={1}
        />
      </Map>

      <MapControl position={ControlPosition.BOTTOM_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} />
      </MapControl>
    </Stack>
  );
}

export default MapComponent;
