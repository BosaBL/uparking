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
} {
  const half = Math.floor(estacionamiento.capacidad_max / 2);
  const quart = Math.floor(half / 2);

  if (estacionamiento.capacidad < half) {
    return {
      stroke: '#22543D',
      fill: '#48BB78',
    };
  }
  if (
    estacionamiento.capacidad >= half &&
    estacionamiento.capacidad < quart + half
  ) {
    return {
      stroke: '#7B341E',
      fill: '#ED8936',
    };
  }
  return {
    stroke: '#9B2C2C',
    fill: '#F56565',
  };
}
