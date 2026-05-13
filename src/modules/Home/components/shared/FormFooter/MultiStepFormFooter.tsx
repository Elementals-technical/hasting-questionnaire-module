import React, { useEffect } from 'react';
import { useMultiStepFormContext } from '../MultiStepForm/MultiStepFormContext';
import { useHotkey } from '@tanstack/react-hotkeys';
import clsx from 'clsx';
import ReactGA from 'react-ga4';
import { trackQuizStep } from '@/utils/ga4/analytics-utils';
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
    const { goToPreviousStep, goToNextStep, isLastStep, currentStep, steps, currentStepIndex } =
        useMultiStepFormContext();

    const handleBack = onBack || goToPreviousStep;
    const handleNext = onNext || goToNextStep;

    useEffect(() => {
        const step = steps[currentStepIndex];

        if (!step) return;

        // 1. Отправляем как просмотр виртуальной страницы
        ReactGA.send({
            hitType: 'pageview',
            page: `/quiz/step-${step.id}`,
            title: `Quiz Step ${step.label}`,
        });

        // GTM
        window.dataLayer = window.dataLayer || [];

        // 1. Отправляем как просмотр виртуальной страницы
        window.dataLayer.push({
            event: 'quiz_page_view',
            page_type: 'quiz',
            quiz_step: step.id,
            quiz_step_label: step.label,
            quiz_url: window.location.href,
        });
    }, [currentStepIndex, steps]);

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
                        onClick={() => {
                            trackQuizStep(currentStep.label);
                            return handleNext();
                        }}
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
