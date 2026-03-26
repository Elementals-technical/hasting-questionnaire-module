import { useMemo, useState } from 'react';
import { useFileIndexedDBValue } from '@/lib/indexedDB/utils';
import { useNavigate } from '@tanstack/react-router';
import type { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';
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
    const selectedProducts = form.watch('products');

    const handleSelectNo = () => {
        form.setValue('no', true, { shouldValidate: true });
        form.setValue('products', [], { shouldValidate: true });
    };

    const handleToggleProduct = (id: PRODUCTS_TYPES) => {
        const current = (form.getValues('products') ?? []) as PRODUCTS_TYPES[];
        const exists = current.includes(id);
        const next = exists ? current.filter((x) => x !== id) : [...current, id];

        form.setValue('products', next, { shouldValidate: true });
        form.setValue('no', next.length === 0, { shouldValidate: true });
    };

    const submitHandler = form.handleSubmit(async (data) => {
        if (data.no) {
            const vanityCount = formData.products.products.find((p) => p.id === PRODUCTS_TYPES._VANITIES)?.count ?? 1;

            const finalProducts = [{ id: PRODUCTS_TYPES._VANITIES, count: vanityCount }];
            const finalDataOverride: MultiStepForm = {
                ...formData,
                products: { products: finalProducts },
                productsFocus: { product: PRODUCTS_TYPES._VANITIES },
                needOtherSolutions: data,
            };

            setFormStepDataBatch({
                products: { products: finalProducts },
                productsFocus: { product: PRODUCTS_TYPES._VANITIES },
                needOtherSolutions: data,
            });

            await submitFinal(
                {
                    setShowOverlay,
                    get,
                    contactMutation,
                    uploadFiles,
                    sendEmailMutation,
                    navigate,
                },
                finalDataOverride
            );
            return;
        }

        const vanityCount = formData.products.products.find((p) => p.id === PRODUCTS_TYPES._VANITIES)?.count ?? 1;
        const otherSelectedProducts = (data.products ?? []).filter((id) => id !== PRODUCTS_TYPES._VANITIES);

        const updatedProducts = [
            { id: PRODUCTS_TYPES._VANITIES, count: vanityCount },
            ...otherSelectedProducts.map((id) => ({ id, count: 1 })),
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
            goToStep(nextOtherProductId as keyof MultiStepForm);
        }
    });

    if (showOverlay) {
        return <CalculatingOverlay />;
    }

    return (
        <FormStepLayout title={currentStep.title} description={currentStep.description}>
            <div className={s.form}>
                <div className={s.grid}>
                    <BathroomCard option={NO_OPTION} isSelected={isNoSelected} onToggle={handleSelectNo} />

                    {otherOptions.map((option) => (
                        <BathroomCard
                            key={option.id}
                            option={option}
                            isSelected={!isNoSelected && selectedProducts.includes(option.id)}
                            onToggle={() => handleToggleProduct(option.id)}
                        />
                    ))}
                </div>
            </div>

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </FormStepLayout>
    );
};
