import { createLazyFileRoute } from '@tanstack/react-router';

const Error = () => {
    return <h1 style={{ fontSize: '48px', textAlign: 'center' }}>Please finish all steps first!</h1>;
};
export const Route = createLazyFileRoute('/error')({
    component: Error,
});
