import React from 'react';
import BathroomCard from '../../../../../../../../shared/BathroomCard/BathroomCard';
import { BathroomFocusPickerPropsT } from './types';
import { useMultiStepFormStepForm } from '@/shared';
import { BathroomsFocusStepData } from '@/shared/MultiStepForm/types';
import { Controller } from 'react-hook-form';
import { bathroomOptions } from '../../../SelectBathroomsStep/components/BathroomPicker/constants';
import s from './BathroomFocusPicker.module.scss';

const BathroomFocusPicker: React.FC<BathroomFocusPickerPropsT> = ({ form }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const { rooms } = useMultiStepFormStepForm('bathrooms').form.getValues();

    const focusOptions = bathroomOptions.filter((option) => rooms.some((selected) => selected.id === option.id));

    const onSubmit = (data: BathroomsFocusStepData) => {
        console.log('Form data:', data);
        // Handle form submission
    };
    return (
        <form className={s.wrap} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="rooms"
                control={control}
                render={({ field }) => {
                    const handleToggle = (optionId: string) => {
                        const existingIndex = field.value.findIndex((room) => {
                            return room === optionId;
                        });

                        if (existingIndex >= 0) {
                            field.onChange(
                                field.value.filter((_, i) => {
                                    return i !== existingIndex;
                                })
                            );
                        } else {
                            field.onChange([optionId]);
                        }
                    };

                    return (
                        <div className={s.list}>
                            {focusOptions.map((option) => {
                                const room = field.value.find((r) => {
                                    return r === option.id;
                                });
                                const isSelected = !!room;

                                return (
                                    <BathroomCard
                                        key={option.id}
                                        option={option}
                                        isSelected={isSelected}
                                        onToggle={() => {
                                            return handleToggle(option.id);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    );
                }}
            />
            {errors.rooms && <p className={s.error}>{errors.rooms.message}</p>}
        </form>
    );
};

export default BathroomFocusPicker;
