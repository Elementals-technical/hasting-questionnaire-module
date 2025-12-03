import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui';
import s from './EmailForm.module.scss';

export const EmailForm = () => {
    const { currentStep, goToPreviousStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

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
                                    {error && <span className={s.errorMessage}>{error.message}</span>}
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={goToPreviousStep}>
                    BACK
                </Button>
                <Button className={s.btnNext} onClick={submitHandler}>
                    Next
                </Button>
            </div>
        </div>
    );
};
