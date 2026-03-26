import { createLazyFileRoute } from '@tanstack/react-router';
import { VanityQuizRoute } from '@/modules/VanityQuiz/VanityQuizRoute';

export const Route = createLazyFileRoute('/quiz-vanities/questionnaire/')({
    component: VanityQuizRoute,
});
