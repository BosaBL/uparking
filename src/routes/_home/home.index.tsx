import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/home/')({
  component: () => <div>Hello /_home/home/!</div>
})