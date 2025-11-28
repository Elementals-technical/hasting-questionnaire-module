import { FC } from 'react';
import { WorkflowStepItem } from './types';
import clsx from 'clsx';
import s from './WorkflowStep.module.scss';

export const WorkflowStep: FC<WorkflowStepItem> = ({ className, icon, title, description }) => {
    return (
        <div className={clsx(s.wrap, className)}>
            <div className={s.icon}>{icon}</div>
            <div>
                <h6 className={s.title}>{title}</h6>
                <p className={s.description}>{description}</p>
            </div>
        </div>
    );
};
