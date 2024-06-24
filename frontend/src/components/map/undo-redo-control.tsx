import { useMap } from '@vis.gl/react-google-maps';
import { useReducer, useRef } from 'react';

import reducer, {
  useDrawingManagerEvents,
  useOverlaySnapshots,
} from './undo-redo';

import { RepeatIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { DrawingActionKind } from './types';

interface Props {
  drawingManager: google.maps.drawing.DrawingManager | null;
}

export function UndoRedoControl({ drawingManager }: Props) {
  const map = useMap();

  const [state, dispatch] = useReducer(reducer, {
    past: [],
    now: [],
    future: [],
  });

  // We need this ref to prevent infinite loops in certain cases.
  // For example when the radius of circle is set via code (and not by user interaction)
  // the radius_changed event gets triggered again. This would cause an infinite loop.
  // This solution can be improved by comparing old vs. new values. For now we turn
  // off the "updating" when snapshot changes are applied back to the overlays.
  const overlaysShouldUpdateRef = useRef<boolean>(false);

  useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch);
  useOverlaySnapshots(map, state, overlaysShouldUpdateRef);

  return (
    <HStack m="5" className="drawing-history">
      <Tooltip label="Eliminar Areas">
        <IconButton
          aria-label="Eliminar Areas"
          onClick={() => dispatch({ type: DrawingActionKind.RESET })}
          background="white"
          disabled={!state.past.length}
          height="32px"
          width="32px"
          p="6px"
          borderRadius="0"
          icon={<RepeatIcon color="red.500" />}
        />
      </Tooltip>
    </HStack>
  );
}
