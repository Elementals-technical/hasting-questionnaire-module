import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import { useGetProducts } from '@/tanstackQuery/queries/products';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui';
import { ImagePicker } from './components/ImagePicker/ImagePicker';
import s from './RoomStyleForm.module.scss';

export const RoomStyleForm = () => {
    const { data, isLoading, error } = useGetProducts({ page: 1, limit: 20 });

    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: '/start' });
    };

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('roomStyle', (data = { ...data }));
        goToNextStep();
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <ImagePicker images={data?.rows || []} form={form} />
                </div>
            </div>
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={handleClick}>
                    BACK
                </Button>
                <Button className={s.btnNext} onClick={submitHandler}>
                    Next
                </Button>
            </div>
        </div>
    );
};
