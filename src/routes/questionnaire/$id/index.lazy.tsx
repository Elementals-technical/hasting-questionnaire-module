import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/questionnaire/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/questionnaire/$id/"!</div>
}
