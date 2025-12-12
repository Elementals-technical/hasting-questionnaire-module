import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/modules/Home/components/shared';
import { ProductsPicker } from './components/BathroomPicker/ProductsPicker';
import s from './ProductsForm.module.scss';

export const ProductsForm = () => {
    const { currentStep, setFormStepData, goToNextStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('products');

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('products', (data = { ...data }));
            goToNextStep();
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
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <ProductsPicker form={form} />
                </div>
            </div>
            <MultiStepFormFooter
                componentBeforeNext={<span className={s.totalRooms}>Total products : {totalProducts}</span>}
                onNext={submitHandler}
            />
        </div>
    );
};
