import { useMemo, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
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
    const [page, setPage] = useState(1);
    const productParams = useMemo(() => ({ page: page, limit: 30 }), [page]);
    const { data, isLoading, error } = useGetProducts(productParams);

    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate({ to: '/start' });
    };

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('roomStyle', data);
        goToNextStep();
    });

    // useEffect(() => {
    //     cleanUp();
    // }, []);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <div className={s.content}>
                    <ImagePicker isLoading={isLoading} images={data?.rows || []} form={form} />
                </div>
            </FormStepLayout>
            <MultiStepFormFooter
                onBack={handleBack}
                componentBeforeNext={
                    <span className={s.showMore} onClick={() => setPage(page + 1)}>
                        I don't like these. Show me more.
                    </span>
                }
                onNext={submitHandler}
                isDisabled={!form.formState.isValid}
            />
        </>
    );
};
