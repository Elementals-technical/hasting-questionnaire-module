import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import s from './EmailForm.module.scss';

export const EmailForm = () => {
    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('email');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('email', (data = { ...data }));
        goToNextStep();
    });

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <div className={s.inputWrapper}>
                                    <input
                                        type="text"
                                        className={clsx(s.input, { [s.inputError]: error })}
                                        placeholder="Type your email here"
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                    {error && <ErrorMessage>{error.message}</ErrorMessage>}
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
            <MultiStepFormFooter onNext={submitHandler} />
        </div>
    );
};
