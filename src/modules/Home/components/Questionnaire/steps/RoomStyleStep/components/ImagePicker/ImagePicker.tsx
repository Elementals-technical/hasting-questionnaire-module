import { RoomStyleStepData } from '@/shared/MultiStepForm/types';
import { Controller, UseFormReturn } from 'react-hook-form';
import s from './ImagesForm.module.scss';

interface ImagesPickerProps {
    images: string[]; // Массив URL изображений с бэкенда
    form: UseFormReturn<RoomStyleStepData>;
}

export const ImagePicker: React.FC<ImagesPickerProps> = ({ images, form }) => {
    const {
        control,
        // handleSubmit,
        formState: { errors },
    } = form;

    return (
        <div className={s.wrap}>
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
                        <div className={s.gallery}>
                            {images.map((imageUrl, index) => {
                                const isSelected = field.value?.includes(imageUrl) || false;

                                return (
                                    <div
                                        key={`${imageUrl}-${index}`}
                                        className={s.imageWrapper}
                                        onClick={() => handleToggle(imageUrl)}
                                    >
                                        <img src={imageUrl} alt={`Gallery image ${index + 1}`} className={s.image} />
                                        <div className={`${s.checkbox} ${isSelected ? s.checkboxSelected : ''}`}>
                                            {isSelected && (
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className={s.checkIcon}
                                                >
                                                    <path
                                                        d="M5 13L9 17L19 7"
                                                        stroke="white"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        {isSelected && <div className={s.overlay} />}
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            />
            {errors.rooms && <p className={s.error}>{errors.rooms.message}</p>}
        </div>
    );
};
