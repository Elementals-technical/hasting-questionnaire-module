import { WorkflowStep } from '@/shared/WorkflowSteps/WorkflowStep';
import { useNavigate } from '@tanstack/react-router';
import { STEPS_ITEMS } from './components/constants';
import { Button } from '@/components/ui';
import s from './style.module.scss';

export const StartRoute = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: '/questionnaire' });
    };
    return (
        <div className={s.wrap}>
            <h1 className={s.title}>Bathroom design — without the headache</h1>
            <p className={s.subtitle}>
                Take our 5 minute, refreshingly simple interactive quiz and get <span>ideas</span> in your inbox fast
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
