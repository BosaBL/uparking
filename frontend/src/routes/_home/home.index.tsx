import { Stack } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import DrawableMap from '../../components/map/drawing-example';

function Component() {
  return (
    <APIProvider apiKey="AIzaSyDN6-WJ8-HqzJCSXUjXqTjGDs6sS194F2g">
      <Stack
        height="100"
        width="100"
        maxH="100%"
        maxW="100%"
        flex="1 0 auto"
        background="gray.100"
      >
        <DrawableMap />
      </Stack>
    </APIProvider>
  );
}

export const Route = createFileRoute('/_home/home/')({
  component: Component,
});
