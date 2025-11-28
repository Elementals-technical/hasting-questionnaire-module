import { createLazyFileRoute } from '@tanstack/react-router';
import ResultRoute from '@/modules/Result';

export const Route = createLazyFileRoute('/result')({
    component: ResultRoute,
});
