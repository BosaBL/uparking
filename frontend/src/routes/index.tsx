import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost/ws/estacionamientos');

    // Connection opened
    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log(JSON.parse(event.data));
    });

    redirect({ to: '/home', replace: true });
  },
  component: () => null,
});
