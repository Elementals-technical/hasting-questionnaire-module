import React from 'react';
import { BathroomFocusPickerPropsT } from './types';
import MasterBathIcon from '@/assets/icons/products/MasterBathIcon';
import { BathroomsFocusStepData } from '@/shared/MultiStepForm/types';
import { Controller } from 'react-hook-form';
import { BATHROOM_SELECTABLE_IDS } from '../../constants';
import BathroomCard from '../../../SelectBathroomsStep/components/BathroomCard/BathroomCard';
import { BathroomOption } from '../../../SelectBathroomsStep/components/BathroomCard/types';
import s from './BathroomFocusPicker.module.scss';

const bathroomFocusOptions: BathroomOption[] = BATHROOM_SELECTABLE_IDS.map((i) => {
    return {
        id: i,
        label: i,
        icon: <MasterBathIcon />,
    };
});

const BathroomFocusPicker: React.FC<BathroomFocusPickerPropsT> = ({ form }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

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
                            {bathroomFocusOptions.map((option) => {
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
