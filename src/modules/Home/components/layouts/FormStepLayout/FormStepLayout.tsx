import { FC } from 'react';
import { FormStepLayoutProps } from './types';
import { Subtitle } from './components/Subtitle/Subtitle';
import s from './FormStepLayout.module.scss';

const FormStepLayout: FC<FormStepLayoutProps> = ({ title, description, children }) => {
    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.left}>
                    {typeof title === 'string' ? <div className={s.title}>{title}</div> : title}
                    <Subtitle>{description}</Subtitle>
                </div>
                <div className={s.right} id="hasting-step-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormStepLayout;
