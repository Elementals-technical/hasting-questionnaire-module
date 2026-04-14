import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { LS_VANITY_QUIZ_KEY } from '@/modules/VanityQuiz/vanityQuizSteps';
import { submitHubSpotForm } from '@/api/hubspot/api';
import s from './EmailForm.module.scss';

export const EmailForm = () => {
    const { currentStep, goToNextStep, setFormStepData, localStorageKey } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('email');

    const submitHandler = form.handleSubmit((data) => {
        const HUBSTOPFORM_PAYLOAD = {
            formId:
                localStorageKey === LS_VANITY_QUIZ_KEY
                    ? '003a8bb1-ee71-43ff-966f-bb9c1d0a7f12'
                    : '6859c46c-7a65-424f-86a2-c7397ca61c27',
            portalId: '21569224',
        };

        setFormStepData('email', (data = { ...data }));

        submitHubSpotForm({
            fields: [
                {
                    name: 'email',
                    value: data.email,
                },
            ],
            portalId: HUBSTOPFORM_PAYLOAD.portalId,
            formId: HUBSTOPFORM_PAYLOAD.formId,
        });

        goToNextStep();
    });

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
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
                                <span>{error && <ErrorMessage>{error.message}</ErrorMessage>}</span>
                            </div>
                        );
                    }}
                />
            </FormStepLayout>
            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
