import React from 'react';
import { useMultiStepFormContext } from '../MultiStepForm/MultiStepFormContext';
import clsx from 'clsx';
import { Button } from '@/components/ui';
import s from './MultiStepFormFooter.module.scss';

interface MultiStepFormFooterProps {
    onNext?: () => void;
    onBack?: () => void;
    nextLabel?: string;
    backLabel?: string;
    isNextDisabled?: boolean;
    hideBack?: boolean;
    hideNext?: boolean;
    className?: string;
    componentBeforeNext?: React.ReactNode;
}

export const MultiStepFormFooter = ({
    componentBeforeNext,
    onNext,
    onBack,
    nextLabel = 'NEXT',
    backLabel = 'BACK',
    isNextDisabled = false,
    hideBack = false,
    hideNext = false,
    className,
}: MultiStepFormFooterProps) => {
    const { goToPreviousStep, goToNextStep, isLastStep } = useMultiStepFormContext();

    const handleBack = onBack || goToPreviousStep;
    const handleNext = onNext || goToNextStep;

    return (
        <div className={clsx(s.footer, className)}>
            {!hideBack && (
                <Button className={s.btnBack} onClick={handleBack} type="button">
                    {backLabel}
                </Button>
            )}
            {!hideNext && (
                <div className={s.nextWrap}>
                    {componentBeforeNext && componentBeforeNext}
                    <Button className={s.btnNext} onClick={handleNext} disabled={isNextDisabled} type="submit">
                        {isLastStep ? 'SUBMIT' : nextLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};
