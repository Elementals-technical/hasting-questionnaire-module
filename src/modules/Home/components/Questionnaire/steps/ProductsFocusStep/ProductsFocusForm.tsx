import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import ProductsFocusPicker from './components/BathroomFocusPicker/ProductsFocusPicker';
import s from './ProductsFocusForm.module.scss';

export const ProductsFocusForm = () => {
    const { currentStep, setFormStepData, goToNextStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('productsFocus');

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('productsFocus', (data = { ...data }));
            goToNextStep();
        },
        (errors) => {
            console.log('❌ VALIDATION ERRORS:', errors);
        }
    );

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <ProductsFocusPicker form={form} />
                </div>
            </div>
            <MultiStepFormFooter onNext={submitHandler} />
        </div>
    );
};
