import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui';
import s from './RoomStyleForm.module.scss';

export const RoomStyleForm = () => {
    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: '/start' });
    };

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
                <Button className={s.btnBack} onClick={handleClick}>
                    BACK
                </Button>
                <Button className={s.btnNext} onClick={submitHandler}>
                    Next
                </Button>
            </div>
        </div>
    );
};
