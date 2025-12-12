import { useState } from 'react';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { GreetingsIcon } from '@/assets/icons/steps/GreetingsIcon';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import s from './NameForm.module.scss';

export const NameForm = () => {
    const [showGreeting, setShowGreeting] = useState(false);
    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

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
