import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared';
import { Button } from '@/components/ui';
import { BathroomsPicker } from './components/BathroomPicker/BathroomPicker';
import s from './BathroomsForm.module.scss';

export const BathroomsForm = () => {
    const { currentStep, setFormStepData, goToNextStep, goToPreviousStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('bathrooms');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('bathrooms', (data = { ...data }));
        goToNextStep();
    });

    const { watch } = form;

    const rooms = watch('rooms');

    const totalRooms = rooms.reduce((sum, room) => {
        return sum + room.count;
    }, 0);

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <BathroomsPicker form={form} />
                </div>
            </div>
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={goToPreviousStep}>
                    BACK
                </Button>

                <div className={s.rightSectionBtns}>
                    <span className={s.totalRooms}>Total rooms : {totalRooms}</span>
                    <Button className={s.btnNext} onClick={submitHandler}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
