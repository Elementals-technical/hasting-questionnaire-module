import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import BathroomFocusPicker from './components/BathroomFocusPicker/BathroomFocusPicker';
import s from './BathroomFocusForm.module.scss';

export const BathroomFocusForm = () => {
    const { currentStep, setFormStepData, goToNextStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('bathroomFocus');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('bathroomFocus', (data = { ...data }));
        goToNextStep();
    });

    return (
        <>
            <FormStepLayout
                title={<div className={s.title}>{currentStep.title}</div>}
                description={currentStep.description}
            >
                <div className={s.content}>
                    <BathroomFocusPicker form={form} />
                </div>
            </FormStepLayout>
            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
