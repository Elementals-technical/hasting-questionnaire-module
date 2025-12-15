import React from 'react';
import BathroomCard from '../../../../../shared/BathroomCard/BathroomCard';
import { BathroomFocusPickerPropsT } from './types';
import { Controller } from 'react-hook-form';
import { useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { BathroomsFocusStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
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
                    const handleToggle = (targetValue: string) => {
                        const currentValue = field.value;
                        const isSelected = currentValue === targetValue;

                        if (isSelected) {
                            field.onChange('');
                        } else {
                            field.onChange(targetValue);
                        }
                    };

                    return (
                        <div className={s.list}>
                            {focusOptions.map((option) => {
                                const isSelected = field.value === option.id;

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
            {errors.rooms && <ErrorMessage>{errors.rooms.message}</ErrorMessage>}
        </form>
    );
};

export default BathroomFocusPicker;
