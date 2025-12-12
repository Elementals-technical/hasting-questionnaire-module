import { useState } from 'react';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import CloseIcon from '@/assets/icons/common/CloseIcon';
import InfoIcon from '@/assets/icons/common/InfoIcon';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { Popoup } from '@/modules/Home/components/shared/Popover/Popover';
import { stageOptions } from './constants';
import { Button } from '@/components/ui';
import s from './StageStep.module.scss';

export const StageForm = () => {
    const [tooltip, setTooltip] = useState('');
    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

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
                                                <Popoup
                                                    trigger={
                                                        <InfoIcon
                                                            className={clsx(s.infoIcon, {
                                                                [s.infoIconSelected]: isSelected,
                                                            })}
                                                            onClick={() => handleShowTooltip(option.tooltipText)}
                                                        />
                                                    }
                                                    content={
                                                        <div className={s.tooltipText}>
                                                            <span>{tooltip}</span>
                                                            <CloseIcon onClick={() => handleShowTooltip('')} />
                                                        </div>
                                                    }
                                                    open={!!tooltip}
                                                    onOpenChange={(open) =>
                                                        handleShowTooltip(open ? option.tooltipText : '')
                                                    }
                                                    side="bottom"
                                                    showArrow={false}
                                                    showCloseButton={false}
                                                />
                                            )}
                                        </Button>
                                    );
                                })}
                                {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
                            </div>
                        )}
                    />
                </div>
            </div>
            <MultiStepFormFooter onNext={submitHandler} />
        </div>
    );
};
