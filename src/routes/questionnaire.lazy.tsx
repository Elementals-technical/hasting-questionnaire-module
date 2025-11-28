import { createLazyFileRoute } from '@tanstack/react-router';
import QuestionnaireRoute from '@/modules/Home';

export const Route = createLazyFileRoute('/questionnaire')({
    component: QuestionnaireRoute,
});
