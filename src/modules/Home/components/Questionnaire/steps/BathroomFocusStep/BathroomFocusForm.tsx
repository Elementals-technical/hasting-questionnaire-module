import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared';
import { Button } from '@/components/ui';
import BathroomFocusPicker from './components/BathroomFocusPicker/BathroomFocusPicker';
import s from './BathroomFocusForm.module.scss';

export const BathroomFocusForm = () => {
    const { currentStep, setFormStepData, goToNextStep, goToPreviousStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('bathroomFocus');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('bathroomFocus', (data = { ...data }));
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
                    <BathroomFocusPicker form={form} />
                </div>
            </div>
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={goToPreviousStep}>
                    Cancel
                </Button>

                <Button className={s.btnNext} onClick={submitHandler}>
                    Next
                </Button>
            </div>
        </div>
    );
};
