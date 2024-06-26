import { createFileRoute } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import NonDrawableMapComponents from '../../components/map/NonDrawableMapComponent';
import { MAP_API_KEY } from '../../constants';

function Component() {
  return (
    <APIProvider apiKey={MAP_API_KEY}>
      <NonDrawableMapComponents />
    </APIProvider>
  );
}

export const Route = createFileRoute('/_home/home/')({
  component: Component,
});
