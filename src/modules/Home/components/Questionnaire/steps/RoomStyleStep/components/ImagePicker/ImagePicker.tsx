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
}

export const ImagePicker: React.FC<ImagesPickerProps> = ({ images, form }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (data: RoomStyleStepData) => {
        console.log('Form data:', data);
        // Handle form submission
    };

    return (
        <form className={s.wrap} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="rooms"
                control={control}
                render={({ field }) => {
                    const handleToggle = (imageUrl: string) => {
                        const currentSelected = field.value || [];
                        const isSelected = currentSelected.includes(imageUrl);

                        if (isSelected) {
                            field.onChange(currentSelected.filter((url: string) => url !== imageUrl));
                        } else {
                            field.onChange([...currentSelected, imageUrl]);
                        }
                    };

                    return (
                        <ImageList variant="masonry" cols={2} gap={16}>
                            {images.map((item) => {
                                const isSelected = field.value.includes(item.image);
                                return (
                                    <ImageListItem className={s.image} key={item.id}>
                                        <img
                                            onClick={() => handleToggle(item.previewImage)}
                                            srcSet={item.previewImage}
                                            src={item.previewImage}
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
