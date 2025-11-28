import { createLazyFileRoute } from '@tanstack/react-router';
import StartRoute from '@/modules/Start';

export const Route = createLazyFileRoute('/start')({
    component: StartRoute,
});
