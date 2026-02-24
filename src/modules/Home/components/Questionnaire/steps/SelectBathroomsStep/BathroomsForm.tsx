import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { MultiStepForm } from '../../../shared/MultiStepForm/types';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import { BathroomsPicker } from './components/BathroomPicker/BathroomPicker';
import s from './BathroomsForm.module.scss';

export const BathroomsForm = () => {
    const { currentStep, setFormStepDataBatch, goToNextStep, goToStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('bathrooms');

    const submitHandler = form.handleSubmit((data) => {
        const updates: Partial<MultiStepForm> = { bathrooms: data };

        if (data.rooms.length === 1) {
            const productId = data.rooms[0].id;
            updates.bathroomFocus = { rooms: productId };

            setFormStepDataBatch(updates);
            goToStep('name');
        } else {
            setFormStepDataBatch(updates);
            goToNextStep();
        }
    });

    const { watch } = form;

    const rooms = watch('rooms');

    const totalRooms = rooms.reduce((sum, room) => {
        return sum + room.count;
    }, 0);

    return (
        <>
            <FormStepLayout
                title={<span className={s.title}>{currentStep.title}</span>}
                description={currentStep.description}
            >
                <BathroomsPicker form={form} />
            </FormStepLayout>
            <MultiStepFormFooter
                onNext={submitHandler}
                componentBeforeNext={<span className={s.totalRooms}>Total rooms : {totalRooms}</span>}
                isDisabled={!form.formState.isValid}
            />
        </>
    );
};
