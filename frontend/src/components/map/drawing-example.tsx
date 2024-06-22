import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps';

import { UndoRedoControl } from './undo-redo-control';
import { useDrawingManager } from './use-drawing-manager';
import { getPaths } from './utils';

function DrawableMap() {
  const drawingManager = useDrawingManager();

  drawingManager?.addListener('polygoncomplete', (e) => {
    getPaths(e);
  });

  return (
    <>
      <Map
        defaultZoom={18}
        defaultCenter={{ lat: -40.58718881060938, lng: -73.08907589274496 }}
        gestureHandling="greedy"
        disableDefaultUI
        mapId="d1d387488b4410d4"
      />

      <MapControl position={ControlPosition.TOP_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} />
      </MapControl>
    </>
  );
}

export default DrawableMap;
