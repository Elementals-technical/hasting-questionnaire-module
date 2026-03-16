import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import { MultiStepFormFooter } from '../../../../../../components/FormFooter/MultiStepFormFooter';
import ProductsFocusPicker from './components/BathroomFocusPicker/ProductsFocusPicker';
import s from './ProductsFocusForm.module.scss';

export const ProductsFocusForm = () => {
    const { currentStep, setFormStepData, goToStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('productsFocus');

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('productsFocus', (data = { ...data }));
            // goToNextStep();

            goToStep(data.product);
        },
        (errors) => {
            console.log('❌ VALIDATION ERRORS:', errors);
        }
    );

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <div className={s.content}>
                    <ProductsFocusPicker form={form} />
                </div>
            </FormStepLayout>
            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
