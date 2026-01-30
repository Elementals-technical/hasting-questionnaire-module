import { useEffect, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { shuffleArray } from './utils';
import { useGetProductsInfinite } from '@/tanstackQuery/queries/products';
import { Product } from '@/tanstackQuery/types';
import { useNavigate } from '@tanstack/react-router';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { ImagePicker } from './components/ImagePicker/ImagePicker';
import s from './RoomStyleForm.module.scss';

export const RoomStyleForm = () => {
    const productParams = { limit: 20, tagId: [253, 323] };
    const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetProductsInfinite(productParams);

    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('roomStyle');

    const navigate = useNavigate();

    // Об'єднуємо всі продукти зі всіх сторінок
    const allProducts = data?.pages.flatMap((page) => page.rows) || [];

    // Ініціалізуємо shuffledProducts при першому завантаженні
    useEffect(() => {
        if (allProducts.length > 0 && shuffledProducts.length === 0) {
            setShuffledProducts(allProducts);
        }
    }, [allProducts, shuffledProducts.length]);

    // Оновлюємо shuffledProducts при завантаженні нових сторінок
    useEffect(() => {
        if (allProducts.length > shuffledProducts.length) {
            setShuffledProducts(allProducts);
        }
    }, [allProducts, shuffledProducts.length]);

    const handleShuffle = () => {
        setShuffledProducts(shuffleArray(allProducts));
    };

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
            <FormStepLayout
                title={<span className={s.title}>{currentStep.title}</span>}
                description={currentStep.description}
            >
                <div className={s.content}>
                    <ImagePicker
                        isLoading={isLoading}
                        images={shuffledProducts}
                        form={form}
                        onLoadMore={fetchNextPage}
                        hasMore={hasNextPage}
                        isFetchingMore={isFetchingNextPage}
                    />
                </div>
            </FormStepLayout>
            <MultiStepFormFooter
                onBack={handleBack}
                componentBeforeNext={
                    <span className={s.showMore} onClick={handleShuffle}>
                        I don't like these. Show me more.
                    </span>
                }
                onNext={submitHandler}
                isDisabled={!form.formState.isValid}
            />
        </>
    );
};
