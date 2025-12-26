import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import { ProductsPicker } from './components/BathroomPicker/ProductsPicker';
import s from './ProductsForm.module.scss';

export const ProductsForm = () => {
    const { currentStep, setFormStepData, goToNextStep, goToStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('products');

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('products', (data = { ...data }));

            if (data.products.length === 1) {
                setFormStepData('productsFocus', { product: data.products[0].id });

                goToStep(data.products[0].id);
                return;
            } else {
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
