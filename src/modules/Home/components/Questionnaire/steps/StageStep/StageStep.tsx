import { useState } from 'react';
import CloseIcon from '@/assets/icons/common/CloseIcon';
import InfoIcon from '@/assets/icons/common/InfoIcon';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { stageOptions } from './constants';
import { Button } from '@/components/ui';
import s from './StageStep.module.scss';

export const StageForm = () => {
    const [tooltip, setTooltip] = useState('');
    const { currentStep, goToPreviousStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('stage');

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('stage', (data = { ...data }));
        goToNextStep();
    });

    const handleShowTooltip = (text: string) => setTooltip(text);

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={s.content}>
                    <Controller
                        name="stage"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className={s.optionsContainer}>
                                {stageOptions.map((option) => {
                                    const isSelected = field.value === option.id;

                                    return (
                                        <Button
                                            key={option.id}
                                            type="button"
                                            onClick={() => field.onChange(option.id)}
                                            className={clsx(s.optionButton, { [s.optionButtonSelected]: isSelected })}
                                        >
                                            <span className={s.optionLabel}>{option.label}</span>
                                            {option?.hasTooltip && (
                                                <InfoIcon
                                                    className={s.infoIcon}
                                                    onClick={() => handleShowTooltip(option.tooltipText)}
                                                />
                                            )}
                                        </Button>
                                    );
                                })}
                                {fieldState.error && <p className={s.errorMessage}>{fieldState.error.message}</p>}
                                {tooltip && (
                                    <div className={s.tooltipText}>
                                        <span>{tooltip}</span> <CloseIcon onClick={() => setTooltip('')} />
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={goToPreviousStep}>
                    BACK
                </Button>
                <Button className={s.btnNext} onClick={submitHandler}>
                    Next
                </Button>
            </div>
        </div>
    );
};
