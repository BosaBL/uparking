import {
  CheckCircleIcon,
  InfoIcon,
  NotAllowedIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import { As } from '@chakra-ui/react';
import { Estacionamiento } from './types';

export function getLatLngFromPolygon(
  polygon: google.maps.Polygon
): google.maps.LatLngLiteral[] {
  const polygonBounds = polygon.getPath();
  const bounds = [];
  for (let i = 0; i < polygonBounds.getLength(); i += 1) {
    const point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng(),
    };
    bounds.push(point);
  }

  return bounds;
}

export function getLatLngArray(
  polygons: google.maps.LatLngLiteral[]
): number[][][] {
  const coords = polygons.map((el) => [el.lat, el.lng]);
  coords.push([polygons[0].lat, polygons[0].lng]);
  return [coords];
}

export function getLatLngFromArray(
  points: number[][]
): google.maps.LatLngLiteral[] {
  const object = points.map((el) => {
    return { lat: el[0], lng: el[1] };
  });
  return object;
}

export function getTreshholdColor(estacionamiento: Estacionamiento): {
  stroke: string;
  fill: string;
  text: string;
  icon: As;
} {
  const half = Math.floor(estacionamiento.capacidad_max / 2);
  const quart = Math.floor(half / 2);
  const oct = Math.floor(quart / 2);

  if (estacionamiento.capacidad < half) {
    return {
      stroke: '#22543D',
      fill: '#48BB78',
      text: 'Más de la mitad de estacionamientos disponibles.',
      icon: CheckCircleIcon,
    };
  }
  if (estacionamiento.capacidad < quart + half + oct) {
    return {
      stroke: '#D69E2E',
      fill: '#ECC94B',
      text: 'Menos de la mitad de estacionamientos disponibles.',
      icon: InfoIcon,
    };
  }
  if (estacionamiento.capacidad !== estacionamiento.capacidad_max) {
    return {
      stroke: '#7B341E',
      fill: '#ED8936',
      text: 'Muy pocos estacionamientos disponibles.',
      icon: WarningIcon,
    };
  }
  return {
    stroke: '#9B2C2C',
    fill: '#F56565',
    text: 'No hay estacionamientos libres.',
    icon: NotAllowedIcon,
  };
}
