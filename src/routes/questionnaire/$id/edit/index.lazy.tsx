import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/questionnaire/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/questionnaire/$id/edit/"!</div>
}
