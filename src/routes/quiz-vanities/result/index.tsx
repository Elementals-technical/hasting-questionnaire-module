import { createFileRoute, redirect } from '@tanstack/react-router';
import { LS_VANITY_QUIZ_KEY } from '@/modules/VanityQuiz/vanityQuizSteps';
import { VanityResultRoute } from '@/modules/VanityQuiz/VanityResultRoute';

export const Route = createFileRoute('/quiz-vanities/result/')({
    loader: () => {
        const value = localStorage.getItem(LS_VANITY_QUIZ_KEY);
        if (!value) {
            throw redirect({
                to: '/error',
            });
        }
        return { value };
    },
    component: VanityResultRoute,
});
