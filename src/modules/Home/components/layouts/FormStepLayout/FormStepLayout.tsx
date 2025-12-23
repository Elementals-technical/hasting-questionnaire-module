import { FC } from 'react';
import { FormStepLayoutProps } from './types';
import s from './FormStepLayout.module.scss';

const FormStepLayout: FC<FormStepLayoutProps> = ({ title, description, children }) => {
    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.left}>
                    {typeof title === 'string' ? <div className={s.title}>{title}</div> : title}
                    <div className={s.subtitle}>{description}</div>
                </div>
                <div className={s.right}>{children}</div>
            </div>
        </div>
    );
};

export default FormStepLayout;
