import { useEffect, useMemo } from 'react';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { useGetProducts } from '@/tanstackQuery/queries/products';
import { useNavigate } from '@tanstack/react-router';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { ImagePicker } from './components/ImagePicker/ImagePicker';
import s from './RoomStyleForm.module.scss';

export const RoomStyleForm = () => {
    const productParams = useMemo(() => ({ page: 1, limit: 100 }), []);
    const { data, isLoading, error } = useGetProducts(productParams);

    const { currentStep, goToNextStep, setFormStepData, cleanUp } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate({ to: '/start' });
    };

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('roomStyle', data);
        goToNextStep();
    });

    useEffect(() => {
        cleanUp();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.left}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.right}>
                    <ImagePicker images={data?.rows || []} form={form} />
                </div>
            </div>
            <MultiStepFormFooter onBack={handleBack} onNext={submitHandler} />
        </div>
    );
};
