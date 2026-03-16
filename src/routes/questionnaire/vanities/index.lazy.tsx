import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/questionnaire/vanities/')({
    component: () => <h1>Vanities Sub Flow</h1>,
});
