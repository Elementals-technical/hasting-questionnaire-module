import { useState } from 'react';
import SmileIcon from '@/assets/icons/common/SmileIcon';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared';
import { QuoteRotator } from '@/shared/QuoteRotator/QuoteRotator';
import { useNavigate } from '@tanstack/react-router';
import { quotes } from './constants';
import { Button } from '@/components/ui';
import { ProductsPicker } from './components/BathroomPicker/ProductsPicker';
import s from './ProductsForm.module.scss';

export const ProductsForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, setFormStepData, goToPreviousStep } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('products');

    const navigate = useNavigate();

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('products', (data = { ...data }));
            setShowOverlay(true);

            setTimeout(() => {
                navigate({ to: '/result' });
            }, 5500);
        },
        (errors) => {
            console.log('❌ VALIDATION ERRORS:', errors);
        }
    );

    const { watch } = form;

    const products = watch('products');

    const totalRooms = products.reduce((sum, room) => {
        return sum + room.count;
    }, 0);

    if (showOverlay) {
        return (
            <div className={s.overlay}>
                <div className={s.overlayTitle}>Calculating your results</div>
                <div className={s.loader} />
                <div className={s.overlaySubtitle}>Did you know?</div>
                <QuoteRotator quotes={quotes} />
                <SmileIcon />
            </div>
        );
    }

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
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={goToPreviousStep}>
                    BACK
                </Button>

                <div className={s.rightSectionBtns}>
                    <span className={s.totalRooms}>Total products : {totalRooms}</span>
                    <Button className={s.btnNext} onClick={submitHandler}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
