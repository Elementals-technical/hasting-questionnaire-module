import { Controller } from 'react-hook-form';
import type { BathroomsStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import { PRODUCTS_TYPES } from '@/modules/Home/components/Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import { bathroomOptions } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/components/BathroomPicker/constants';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { StyleHint } from '@/modules/Home/components/shared/StyleHint/StyleHint';
import s from './VanitiesRoomTypeForm.module.scss';

export const VanitiesRoomTypeForm = () => {
    const { currentStep, goToNextStep, setFormStepDataBatch, formData } = useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('bathrooms');

    const vanityCount = formData.products.products.find((p) => p.id === PRODUCTS_TYPES._VANITIES)?.count ?? 1;

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
            <FormStepLayout
                title={currentStep.title}
                description={
                    <div className={s.description}>
                        <p>{currentStep.description}</p>
                        <StyleHint text="The value is limited by the number of items selected in the previous step." />
                    </div>
                }
            >
                <div className={s.wrap}>
                    <Controller
                        name="rooms"
                        control={control}
                        render={({ field }) => {
                            const totalCount = field.value.reduce((sum, room) => sum + room.count, 0);

                            const handleToggle = (optionId: string) => {
                                const existingIndex = field.value.findIndex((room) => room.id === optionId);

                                if (existingIndex >= 0) {
                                    field.onChange(field.value.filter((_, i) => i !== existingIndex));
                                } else {
                                    if (totalCount >= vanityCount) return; // ← не додаємо якщо ліміт вичерпано
                                    field.onChange([...field.value, { id: optionId, count: 1 }]);
                                }
                            };

                            const handleIncrement = (optionId: string) => {
                                if (totalCount >= vanityCount) return;
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
                    {errors.rooms && <ErrorMessage className={s.error}>{errors.rooms.message}</ErrorMessage>}
                </div>
            </FormStepLayout>

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
