import { useEffect, useRef } from 'react';
import { ImageListItem } from '../ImageListItem/ImageListItem';
import { Product } from '@/tanstackQuery/types';
import { Box, CircularProgress, ImageList } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { RoomStyleStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import s from './ImagePicker.module.scss';

interface ImagesPickerProps {
    images: Product[];
    form: UseFormReturn<RoomStyleStepData>;
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore?: boolean;
    isFetchingMore?: boolean;
}

export const ImagePicker: React.FC<ImagesPickerProps> = ({
    images,
    form,
    isLoading,
    onLoadMore,
    hasMore,
    isFetchingMore,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const observerTarget = useRef<HTMLDivElement>(null);

    // Infinity scroll через IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, isFetchingMore, onLoadMore]);

    const onSubmit = (data: RoomStyleStepData) => {
        console.log('Form data:', data);
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
                        <>
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
                                        <ImageListItem
                                            key={item.id}
                                            currentItem={currentItem}
                                            isSelected={isSelected}
                                            onToggle={handleToggle}
                                            item={item}
                                        />
                                    );
                                })}
                            </ImageList>

                            {/* Елемент-тригер для infinity scroll */}
                            <Box ref={observerTarget} sx={{ height: 20, margin: '20px 0' }} />

                            {isFetchingMore && (
                                <div className={s.loader}>
                                    <CircularProgress className={s.loaderCircle} />
                                </div>
                            )}
                        </>
                    );
                }}
            />
            {errors.rooms && <ErrorMessage>{errors.rooms.message}</ErrorMessage>}
        </form>
    );
};
