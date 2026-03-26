import { Controller } from 'react-hook-form';
import type { BathroomsStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import s from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/components/BathroomPicker/BathroomPicker.module.scss';
import { bathroomOptions } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/components/BathroomPicker/constants';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';

export const VanitiesRoomTypeForm = () => {
    const { currentStep, goToNextStep, setFormStepDataBatch } = useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('bathrooms');

    const submitHandler = form.handleSubmit((data: BathroomsStepData) => {
        setFormStepDataBatch({
            bathrooms: data,
        });
        goToNextStep();
    });

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <Controller
                    name="rooms"
                    control={form.control}
                    render={({ field }) => {
                        const handleToggle = (roomId: string) => {
                            const existingIndex = field.value?.findIndex((r) => r.id === roomId);
                            if (existingIndex !== undefined && existingIndex >= 0) {
                                field.onChange(field.value.filter((r) => r.id !== roomId));
                            } else {
                                field.onChange([
                                    ...(field.value || []),
                                    { id: roomId as BathroomsStepData['rooms'][number]['id'], count: 1 },
                                ]);
                            }
                        };

                        return (
                            <div className={s.grid}>
                                {bathroomOptions.map((option) => {
                                    const isSelected = field.value?.some((r) => r.id === option.id) ?? false;

                                    return (
                                        <BathroomCard
                                            key={option.id}
                                            option={option}
                                            count={undefined}
                                            isSelected={isSelected}
                                            onToggle={() => handleToggle(option.id)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    }}
                />
            </FormStepLayout>

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
