import { useEffect } from 'react';
import { Button } from '@/components';
import { useLocalStorageValue } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-router';
import { STEPS_ITEMS, words } from './components/constants';
import { WorkflowStep } from '@/components/WorkflowSteps/WorkflowStep';
import { RotatingText } from '../../components/TextRotator/TextRotator';
import { LS_MULTI_STEP_FORM_KEY } from '../Home/components/shared';
import s from './style.module.scss';

export const StartRoute = () => {
    const navigate = useNavigate();

    const { remove } = useLocalStorageValue(LS_MULTI_STEP_FORM_KEY);

    useEffect(() => {
        remove();
    }, []);

    const handleClick = () => {
        navigate({ to: '/questionnaire' });
    };

    return (
        <div className={s.wrap}>
            <h1 className={s.title}>Bathroom design — without the headache</h1>
            <p className={s.subtitle}>
                Take our 5 minute, refreshingly simple interactive quiz and get <RotatingText words={words} /> in your
                inbox fast
            </p>
            <div className={s.steps}>
                {STEPS_ITEMS.map((i, idx) => {
                    return <WorkflowStep title={`${idx + 1}. ${i.title}`} description={i.description} icon={i.icon} />;
                })}
            </div>
            <Button className={s.cta} onClick={handleClick}>
                LET’S GET STARTED
            </Button>
        </div>
    );
};

export default StartRoute;
