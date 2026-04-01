import { useEffect } from 'react';
import { useLocalStorageValue } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-router';
import { WorkflowStep } from '@/modules/Home/components/shared/WorkflowSteps/WorkflowStep';
import { STEPS_ITEMS } from '@/modules/Start/components/constants';
import s from '@/modules/Start/style.module.scss';
import { LS_VANITY_QUIZ_KEY } from '@/modules/VanityQuiz/vanityQuizSteps';
import { words } from './constants';
import { Button } from '@/components/ui';
import { RotatingText } from '../Home/components/shared/TextRotator/TextRotator';

export const VanityStartRoute = () => {
    const navigate = useNavigate();

    const { remove } = useLocalStorageValue(LS_VANITY_QUIZ_KEY);

    useEffect(() => {
        remove();
    }, [remove]);

    const handleClick = () => {
        navigate({ to: '/quiz-vanities/questionnaire' });
    };

    return (
        <div className={s.wrap}>
            <h1 className={s.title}>Vanity Solutioning — done for you</h1>
            <p className={s.subtitle}>
                Take out 4 minute refreshingly simple interactive quiz and get <RotatingText words={words} /> vanity
                solutions in your inbox fast
            </p>
            <div className={s.steps}>
                {STEPS_ITEMS.map((i, idx) => {
                    return (
                        <WorkflowStep
                            key={idx}
                            title={`${idx + 1}. ${i.title}`}
                            description={i.description}
                            icon={i.icon}
                        />
                    );
                })}
            </div>
            <Button className={s.cta} onClick={handleClick}>
                LET’S GET STARTED
            </Button>
        </div>
    );
};
