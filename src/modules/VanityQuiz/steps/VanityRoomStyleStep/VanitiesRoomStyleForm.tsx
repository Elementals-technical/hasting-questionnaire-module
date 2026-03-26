import { useEffect, useState } from 'react';
import { useGetProductsInfinite } from '@/tanstackQuery/queries/products';
import { Product } from '@/tanstackQuery/types';
import { useNavigate } from '@tanstack/react-router';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import { ImagePicker } from '@/modules/Home/components/Questionnaire/steps/RoomStyleStep/components/ImagePicker/ImagePicker';
import s from '@/modules/Home/components/Questionnaire/steps/RoomStyleStep/RoomStyleForm.module.scss';
import { shuffleArray } from '@/modules/Home/components/Questionnaire/steps/RoomStyleStep/utils';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';

export const VanitiesRoomStyleForm = () => {
    const productParams = { limit: 20, tagId: [253, 61], excludeTagIds: [323] };
    const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetProductsInfinite(productParams);

    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('roomStyle');
    const navigate = useNavigate();

    const allProducts = data?.pages.flatMap((page) => page.rows) || [];

    useEffect(() => {
        if (allProducts.length > 0 && shuffledProducts.length === 0) {
            setShuffledProducts(allProducts);
        }
    }, [allProducts, shuffledProducts.length]);

    useEffect(() => {
        if (allProducts.length > shuffledProducts.length) {
            setShuffledProducts(allProducts);
        }
    }, [allProducts, shuffledProducts.length]);

    const handleShuffle = () => {
        setShuffledProducts(shuffleArray(shuffledProducts));
    };

    const handleBack = () => {
        navigate({ to: '/quiz-vanities' });
    };

    const submitHandler = form.handleSubmit((dataValue) => {
        setFormStepData('roomStyle', dataValue);
        goToNextStep();
    });

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
