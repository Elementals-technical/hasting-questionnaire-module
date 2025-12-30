import { Product } from '@/tanstackQuery/types';
import { ImageList, ImageListItem } from '@mui/material';
import { CheckIcon } from 'lucide-react';
import { Controller, UseFormReturn } from 'react-hook-form';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { RoomStyleStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import s from './ImagePicker.module.scss';

interface ImagesPickerProps {
    images: Product[]; // Массив URL изображений с бэкенда
    form: UseFormReturn<RoomStyleStepData>;
    isLoading: boolean;
}

export const ImagePicker: React.FC<ImagesPickerProps> = ({ images, form, isLoading }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (data: RoomStyleStepData) => {
        console.log('Form data:', data);
        // Handle form submission
    };

    if (isLoading) return <span>Loading...</span>;
    return (
        <form className={s.wrap} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="rooms"
                control={control}
                render={({ field }) => {
                    const handleToggle = (image: { img: string; aesthetics: string[] }) => {
                        const currentSelected = field.value || [];
                        const isSelected = field.value.some((i) => i.img === image.img);

                        if (isSelected) {
                            field.onChange(currentSelected.filter((item) => item.img !== image.img));
                        } else {
                            field.onChange([...currentSelected, image]);
                        }
                    };

                    return (
                        <ImageList variant="masonry" cols={2} gap={16}>
                            {images.map((item) => {
                                const isSelected = field.value.some((i) => i.img === item.image);
                                const currentItem = {
                                    img: item.image,
                                    aesthetics: item.categories
                                        .find((i) => i.name === 'Aesthetic')
                                        ?.tags.map((i) => i.name) as string[],
                                };

                                return (
                                    <ImageListItem className={s.image} key={item.id}>
                                        <img
                                            onClick={() => handleToggle(currentItem)}
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                        />
                                        {isSelected && <CheckIcon className={s.imageSelected} />}
                                    </ImageListItem>
                                );
                            })}
                        </ImageList>
                    );
                }}
            />
            {errors.rooms && <ErrorMessage>{errors.rooms.message}</ErrorMessage>}
        </form>
    );
};
