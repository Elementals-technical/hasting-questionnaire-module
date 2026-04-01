import { Controller } from 'react-hook-form';
import type { BathroomsStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import s from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/components/BathroomPicker/BathroomPicker.module.scss';
import { bathroomOptions } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/components/BathroomPicker/constants';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';

export const VanitiesRoomTypeForm = () => {
    const { currentStep, goToNextStep, setFormStepDataBatch } = useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('bathrooms');

    const {
        control,
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit((data: BathroomsStepData) => {
        setFormStepDataBatch({
            bathrooms: data,
        });
        goToNextStep();
    });

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <div className={s.wrap}>
                    <Controller
                        name="rooms"
                        control={control}
                        render={({ field }) => {
                            const handleToggle = (optionId: string) => {
                                const existingIndex = field.value.findIndex((room) => {
                                    return room.id === optionId;
                                });

                                if (existingIndex >= 0) {
                                    field.onChange(
                                        field.value.filter((_, i) => {
                                            return i !== existingIndex;
                                        })
                                    );
                                } else {
                                    field.onChange([...field.value, { id: optionId, count: 1 }]);
                                }
                            };

                            const handleIncrement = (optionId: string) => {
                                const updatedRooms = field.value.map((room) => {
                                    return room.id === optionId ? { ...room, count: room.count + 1 } : room;
                                });
                                field.onChange(updatedRooms);
                            };

                            const handleDecrement = (optionId: string) => {
                                const updatedRooms = field.value.map((room) => {
                                    return room.id === optionId && room.count > 1
                                        ? { ...room, count: room.count - 1 }
                                        : room;
                                });
                                field.onChange(updatedRooms);
                            };

                            return (
                                <div className={s.grid}>
                                    {bathroomOptions.map((option) => {
                                        const room = field.value.find((r) => {
                                            return r.id === option.id;
                                        });
                                        const isSelected = !!room;
                                        const count = room?.count || 1;

                                        return (
                                            <BathroomCard
                                                key={option.id}
                                                option={option}
                                                count={count}
                                                isSelected={isSelected}
                                                onToggle={() => {
                                                    return handleToggle(option.id);
                                                }}
                                                onIncrement={() => {
                                                    return handleIncrement(option.id);
                                                }}
                                                onDecrement={() => {
                                                    return handleDecrement(option.id);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        }}
                    />
                    {errors.rooms && <ErrorMessage>{errors.rooms.message}</ErrorMessage>}
                </div>
            </FormStepLayout>

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
