import { createFileRoute } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import NonDrawableMapComponents from '../../components/map/NonDrawableMapComponent';
import { MAP_API_KEY } from '../../constants';

export const Route = createFileRoute('/_admin/admin/')({
  component: () => {
    return (
      <APIProvider apiKey={MAP_API_KEY}>
        <NonDrawableMapComponents />
      </APIProvider>
    );
  },
});
