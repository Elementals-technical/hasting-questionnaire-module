import { WorkflowStep } from '@/shared/WorkflowSteps/WorkflowStep';
import { STEPS_ITEMS } from './constants';
import s from './style.module.scss';

export const ResultRoute = () => {
    return (
        <div className={s.wrap}>
            <h1 className={s.title}>Thank you for completing the questionnaire!</h1>
            <p className={s.subtitle}>Your designer is excited to get started!</p>
            <h3 className={s.label}>What’s next</h3>
            <div className={s.steps}>
                {STEPS_ITEMS.map((i) => {
                    return (
                        <WorkflowStep className={s.step} title={i.title} description={i.description} icon={i.icon} />
                    );
                })}
            </div>
        </div>
    );
};

export default ResultRoute;
