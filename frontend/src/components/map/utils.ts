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
