import { ImageListItem } from '../ImageListItem/ImageListItem';
import { Product } from '@/tanstackQuery/types';
import { CircularProgress } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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
    // isFetchingMore,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    // const observerTarget = useRef<HTMLDivElement>(null);
    // const observerRef = useRef<IntersectionObserver | null>(null);

    const onSubmit = (data: RoomStyleStepData) => {
        console.log('Form data:', data);
    };

    console.log('IMAGES', images);

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
                        <InfiniteScroll
                            className={s.list}
                            dataLength={images.length}
                            next={onLoadMore}
                            hasMore={hasMore || false}
                            scrollableTarget="hasting-step-content"
                            scrollThreshold={0.4}
                            loader={
                                <div className={s.loader}>
                                    <CircularProgress className={s.loaderCircle} />
                                </div>
                            }
                        >
                            <ResponsiveMasonry columnsCountBreakPoints={{ 300: 2 }}>
                                <Masonry>
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
                                </Masonry>
                            </ResponsiveMasonry>
                        </InfiniteScroll>
                    );
                }}
            />
            {errors.rooms && <ErrorMessage>{errors.rooms.message}</ErrorMessage>}
        </form>
    );
};
