import { createLazyFileRoute } from '@tanstack/react-router';
import { VanityStartRoute } from '@/modules/VanityQuiz/VanityStartRoute';

export const Route = createLazyFileRoute('/quiz-vanities/')({
    component: VanityStartRoute,
});
