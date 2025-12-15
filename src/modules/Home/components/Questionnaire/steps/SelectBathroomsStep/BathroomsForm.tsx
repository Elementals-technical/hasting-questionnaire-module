import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import { BathroomsPicker } from './components/BathroomPicker/BathroomPicker';
import s from './BathroomsForm.module.scss';

export const BathroomsForm = () => {
    const { currentStep, setFormStepData, goToNextStep, goToStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('bathrooms');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('bathrooms', (data = { ...data }));
        if (data.rooms.length === 1) {
            setFormStepData('bathroomFocus', { rooms: data.rooms[0].id });
            goToStep('name');
        } else {
            goToNextStep();
        }
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
            <MultiStepFormFooter
                onNext={submitHandler}
                componentBeforeNext={<span className={s.totalRooms}>Total rooms : {totalRooms}</span>}
            />
        </div>
    );
};
