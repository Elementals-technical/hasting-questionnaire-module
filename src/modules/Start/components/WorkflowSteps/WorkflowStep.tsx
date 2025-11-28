import { FC } from 'react';
import { WorkflowStepItem } from './types';
import s from './WorkflowStep.module.scss';

export const WorkflowStep: FC<WorkflowStepItem> = ({ icon, title, description }) => {
    return (
        <div className={s.wrap}>
            <div className={s.icon}>{icon}</div>
            <div>
                <h6 className={s.title}>{title}</h6>
                <p className={s.description}>{description}</p>
            </div>
        </div>
    );
};
