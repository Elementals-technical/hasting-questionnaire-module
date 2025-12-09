import { ProductsPickerPropsT } from './types';
import BathroomCard from '@/shared/BathroomCard/BathroomCard';
import { ProductsStepData } from '@/shared/MultiStepForm/types';
import { Controller } from 'react-hook-form';
import { productsOptions } from './constants';
import s from './ProductsPicker.module.scss';

export const ProductsPicker: React.FC<ProductsPickerPropsT> = ({ form }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (data: ProductsStepData) => {
        console.log('Form data:', data);
        // Handle form submission
    };

    return (
        <form className={s.wrap} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="products"
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
                            return room.id === optionId && room.count > 1 ? { ...room, count: room.count - 1 } : room;
                        });
                        field.onChange(updatedRooms);
                    };

                    return (
                        <div className={s.grid}>
                            {productsOptions.map((option) => {
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
            {errors.products && <p className={s.error}>{errors.products.message}</p>}
        </form>
    );
};
