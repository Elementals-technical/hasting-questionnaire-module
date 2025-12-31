import { createFileRoute, redirect } from '@tanstack/react-router';
import { LS_MULTI_STEP_FORM_KEY } from '@/modules/Home/components/shared';
import ResultRoute from '@/modules/Result';

export const Route = createFileRoute('/result')({
    loader: () => {
        const value = localStorage.getItem(LS_MULTI_STEP_FORM_KEY);
        if (!value) {
            throw redirect({
                to: '/error',
            });
        }
        return { value };
    },
    component: ResultRoute,
});
