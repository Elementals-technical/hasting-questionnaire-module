import clsx from 'clsx';
import type { HomeExampleProps } from './types';
import { Questionnaire } from './components/Questionnaire/Questionnaire';
import s from './style.module.scss';

const QuestionnaireRoute: React.FC<HomeExampleProps> = () => {
    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <Questionnaire />
        </main>
    );
};

export default QuestionnaireRoute;
