import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import { Button } from '@/components/ui';
import s from './RoomStyleForm.module.scss';

export const RoomStyleForm = () => {
    const { currentStep, goToPreviousStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('roomStyle', (data = { ...data }));
        goToNextStep();
    });

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>IMAGE SELECTOR MODULE IN DEV</div>
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
