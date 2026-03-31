import { useMemo, useState } from 'react';
import { useFileIndexedDBValue } from '@/lib/indexedDB/utils';
import { useNavigate } from '@tanstack/react-router';
import { Controller } from 'react-hook-form';
import type { MultiStepForm, MultiStepFormStepId } from '@/modules/Home/components/shared/MultiStepForm/types';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useUploadFiles } from '@/hooks/useUploadFiles';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import {
    PRODUCTS_TYPES,
    productsOptions,
} from '@/modules/Home/components/Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import CalculatingOverlay from '@/modules/Home/components/shared/CalculatingOverlay/CalculatingOverlay';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { buildVanityDualShapePayload } from '@/modules/VanityQuiz/model/vanityFormModel';
import s from './NeedOtherSolutionsForm.module.scss';

const NO_OPTION = { id: 'no', label: 'No' };

export const NeedOtherSolutionsForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();

    const { currentStep, formData, goToStep, getOrderedProductSteps, setFormStepDataBatch, submitFinal } =
        useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('needOtherSolutions');

    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { get } = useFileIndexedDBValue();

    const otherOptions = useMemo(() => {
        return productsOptions.filter((p) => p.id !== PRODUCTS_TYPES._VANITIES);
    }, []);

    const isNoSelected = form.watch('no');

    const submitHandler = form.handleSubmit(async (data) => {
        const vanityCount = formData.products.products.find((p) => p.id === PRODUCTS_TYPES._VANITIES)?.count ?? 1;

        if (data.no) {
            const finalProducts = [{ id: PRODUCTS_TYPES._VANITIES, count: vanityCount }];
            const finalDataOverride = buildVanityDualShapePayload({
                ...formData,
                products: { products: finalProducts },
                productsFocus: { product: PRODUCTS_TYPES._VANITIES },
                needOtherSolutions: data,
            });

            setFormStepDataBatch({
                products: { products: finalProducts },
                productsFocus: { product: PRODUCTS_TYPES._VANITIES },
                needOtherSolutions: data,
            });

            await submitFinal(
                { setShowOverlay, get, contactMutation, uploadFiles, sendEmailMutation, navigate },
                finalDataOverride
            );
            return;
        }

        const updatedProducts = [
            { id: PRODUCTS_TYPES._VANITIES, count: vanityCount },
            ...data.products.filter((p) => p.id !== PRODUCTS_TYPES._VANITIES),
        ];

        const updatedFormData = {
            ...formData,
            products: { products: updatedProducts },
            productsFocus: { product: PRODUCTS_TYPES._VANITIES },
            needOtherSolutions: data,
        };

        setFormStepDataBatch({
            products: { products: updatedProducts },
            productsFocus: { product: PRODUCTS_TYPES._VANITIES },
            needOtherSolutions: data,
        });

        const ordered = getOrderedProductSteps(updatedFormData as MultiStepForm);
        const nextOtherProductId = ordered[1];
        if (nextOtherProductId) {
            goToStep(nextOtherProductId as MultiStepFormStepId);
        }
    });

    if (showOverlay) {
        return <CalculatingOverlay />;
    }

    return (
        <FormStepLayout title={currentStep.title} description={currentStep.description}>
            <div className={s.form}>
                <div className={s.grid}>
                    <Controller
                        name="no"
                        control={form.control}
                        render={({ field }) => (
                            <BathroomCard
                                option={NO_OPTION}
                                isSelected={field.value}
                                onToggle={() => {
                                    field.onChange(true);
                                    form.setValue('products', [], { shouldValidate: true });
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="products"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                {otherOptions.map((option) => {
                                    const selected = field.value.find((p) => p.id === option.id);

                                    const handleToggle = () => {
                                        const exists = !!selected;
                                        const next = exists
                                            ? field.value.filter((p) => p.id !== option.id)
                                            : [...field.value, { id: option.id, count: 1 }];
                                        field.onChange(next);
                                        form.setValue('no', next.length === 0, { shouldValidate: true });
                                    };

                                    const handleIncrement = () => {
                                        field.onChange(
                                            field.value.map((p) =>
                                                p.id === option.id ? { ...p, count: p.count + 1 } : p
                                            )
                                        );
                                    };

                                    const handleDecrement = () => {
                                        field.onChange(
                                            field.value.map((p) =>
                                                p.id === option.id && p.count > 1 ? { ...p, count: p.count - 1 } : p
                                            )
                                        );
                                    };

                                    return (
                                        <BathroomCard
                                            key={option.id}
                                            option={option}
                                            isSelected={!isNoSelected && !!selected}
                                            count={selected?.count ?? 1}
                                            onToggle={handleToggle}
                                            onIncrement={handleIncrement}
                                            onDecrement={handleDecrement}
                                        />
                                    );
                                })}
                            </>
                        )}
                    />
                </div>
            </div>

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </FormStepLayout>
    );
};
