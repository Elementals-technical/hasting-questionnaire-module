import React from 'react';
import { Button } from '../Button/Button';
import { useHotkey } from '@tanstack/react-hotkeys';
import clsx from 'clsx';
import { useMultiStepFormContext } from '../../modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
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
    isDisabled?: boolean;
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
    isDisabled = false,
}: MultiStepFormFooterProps) => {
    const { goToPreviousStep, goToNextStep, isLastStep } = useMultiStepFormContext();

    const handleBack = onBack || goToPreviousStep;
    const handleNext = onNext || goToNextStep;

    useHotkey('Enter', () => handleNext(), { enabled: !isNextDisabled && !hideNext && !isDisabled });

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
                    <Button
                        className={clsx(s.btnNext, { [s.disabled]: isDisabled })}
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        type="submit"
                    >
                        {isLastStep ? 'SUBMIT' : nextLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};
