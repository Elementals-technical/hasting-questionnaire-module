import React from 'react';
import BathroomCard from '../../../../../shared/BathroomCard/BathroomCard';
import { ProductsFocusPickerPropsT } from './types';
import { Controller } from 'react-hook-form';
import { useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { ProductsFocusStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import { productsOptions } from '../../../ProductsStep/components/BathroomPicker/constants';
import s from './ProductsFocusPicker.module.scss';

const ProductsFocusPicker: React.FC<ProductsFocusPickerPropsT> = ({ form }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const { products } = useMultiStepFormStepForm('products').form.getValues();

    const focusOptions = productsOptions.filter((option) => products.some((selected) => selected.id === option.id));

    const onSubmit = (data: ProductsFocusStepData) => {
        console.log('Form data:', data);
        // Handle form submission
    };
    return (
        <form className={s.wrap} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="product"
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
            {errors.product && <ErrorMessage>{errors.product.message}</ErrorMessage>}
        </form>
    );
};

export default ProductsFocusPicker;
