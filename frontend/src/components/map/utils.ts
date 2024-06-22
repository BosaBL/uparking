export type CoordT = {
  lat: number;
  lng: number;
};

export function getPaths(polygon: google.maps.Polygon): CoordT[] {
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
