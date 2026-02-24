import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { MultiStepForm } from '../../../shared/MultiStepForm/types';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import { ProductsPicker } from './components/BathroomPicker/ProductsPicker';
import s from './ProductsForm.module.scss';

export const ProductsForm = () => {
    const { currentStep, setFormStepDataBatch, goToNextStep, goToStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('products');

    const submitHandler = form.handleSubmit(
        (data) => {
            const updates: Partial<MultiStepForm> = { products: data };

            if (data.products.length === 1) {
                const productId = data.products[0].id;
                updates.productsFocus = { product: productId };

                setFormStepDataBatch(updates);
                goToStep(productId);
            } else {
                setFormStepDataBatch(updates);
                goToNextStep();
            }
        },
        (errors) => {
            console.log('❌ VALIDATION ERRORS:', errors);
        }
    );

    const { watch } = form;

    const products = watch('products');

    const totalProducts = products.reduce((sum, room) => {
        return sum + room.count;
    }, 0);

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <div className={s.content}>
                    <ProductsPicker form={form} />
                </div>
            </FormStepLayout>
            <MultiStepFormFooter
                componentBeforeNext={<span className={s.totalRooms}>Total products : {totalProducts}</span>}
                onNext={submitHandler}
                isDisabled={!form.formState.isValid}
            />
        </>
    );
};
