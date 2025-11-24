import { CheckboxGroupField } from '../../fields/CheckboxGroupField/CheckboxGroupField';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import s from './RoomStyleForm.module.scss';

export const RoomStyleForm = () => {
    const { currentStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    return (
        <div className={s.wrap}>
            <div className={s.content}>
                <div className={s.title}>{currentStep.title}</div>
                <div className={s.subtitle}>{currentStep.description}</div>
            </div>
            <div className={s.content}>
                <CheckboxGroupField name={'rooms'} control={form.control} options={[]} />
            </div>
        </div>
    );
};
