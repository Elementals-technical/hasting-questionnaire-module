import { Controller } from 'react-hook-form';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import {
    PRODUCTS_TYPES,
    productsOptions,
} from '@/modules/Home/components/Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import s from './VanitiesCountForm.module.scss';

export const VanitiesCountForm = () => {
    const { currentStep, goToNextStep, setFormStepDataBatch } = useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('products');

    const vanitiesOption = productsOptions.find((o) => o.id === PRODUCTS_TYPES._VANITIES)!;

    const submitHandler = form.handleSubmit((data) => {
        setFormStepDataBatch({
            products: data,
            productsFocus: { product: PRODUCTS_TYPES._VANITIES },
        });
        goToNextStep();
    });

    return (
        <FormStepLayout title={currentStep.title} description={currentStep.description}>
            <Controller
                name="products"
                control={form.control}
                render={({ field }) => {
                    const count = field.value?.[0]?.count ?? 1;

                    const handleIncrement = () => {
                        field.onChange([{ id: PRODUCTS_TYPES._VANITIES, count: count + 1 }]);
                    };

                    const handleDecrement = () => {
                        field.onChange([{ id: PRODUCTS_TYPES._VANITIES, count: Math.max(1, count - 1) }]);
                    };

                    return (
                        <div className={s.wrap}>
                            <BathroomCard
                                option={vanitiesOption}
                                count={count}
                                isSelected={true}
                                onToggle={() => {
                                    // Step #2 should not allow deselecting vanities card.
                                }}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                            />
                        </div>
                    );
                }}
            />

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </FormStepLayout>
    );
};
