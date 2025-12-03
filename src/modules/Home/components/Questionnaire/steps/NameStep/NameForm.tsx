import { useState } from 'react';
import { GreetingsIcon } from '@/assets/icons/steps/GreetingsIcon';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui';
import s from './NameForm.module.scss';

export const NameForm = () => {
    const [showGreeting, setShowGreeting] = useState(false);
    const { currentStep, goToPreviousStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('name');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('name', data);
        setShowGreeting(true);

        setTimeout(() => {
            setShowGreeting(false);
            goToNextStep();
        }, 2500);
    });

    if (showGreeting) {
        return (
            <div className={s.greetingOverlay}>
                <div className={s.greetingText}>Nice to meet you, {form.getValues('name')}!</div>
                <GreetingsIcon className={s.greetingIcon} />
            </div>
        );
    }

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <div className={s.inputWrapper}>
                                    <input
                                        type="text"
                                        className={clsx(s.input, { [s.inputError]: error })}
                                        placeholder="Type your name here"
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
