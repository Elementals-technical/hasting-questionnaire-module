import { useState } from 'react';
import SmileIcon from '@/assets/icons/common/SmileIcon';
import BathroomCard from '@/shared/BathroomCard/BathroomCard';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import { QuoteRotator } from '@/shared/QuoteRotator/QuoteRotator';
import Slider from '@/shared/Slider/Slider';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { quotes } from '../ProductsStep/constants';
import { mountingTypesOptions, VANITIES_DEPTH_TYPES } from './constants';
import { Button } from '@/components/ui';
import s from './VanitiesStep.module.scss';

export const VanitiesForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, goToPreviousStep, setFormStepData } = useMultiStepFormContext();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('vanities');

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('vanities', data);
        setShowOverlay(true);

        setTimeout(() => {
            navigate({ to: '/result' });
        }, 5500);
    });

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
                <div className={clsx(s.content, s.form)}>
                    {/* Size Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Size</h2>
                        <Controller
                            name="width"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.optionsContainer}>
                                    <Slider
                                        key={field.name}
                                        label={field.name}
                                        attributeValue={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="depth"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.fieldWwrap}>
                                    <span className={s.fieldLabel}>Depth</span>
                                    <div className={s.optionsContainer}>
                                        {VANITIES_DEPTH_TYPES.map((option) => {
                                            const isSelected = field.value === option;

                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => field.onChange(option)}
                                                    className={clsx(s.optionButton, {
                                                        [s.optionButtonSelected]: isSelected,
                                                    })}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        />
                        {errors.width && <p className={s.errorMessage}>{errors.width.message}</p>}
                    </div>
                    {/* Mount type section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Mounting type</h2>
                        <Controller
                            name="mountingType"
                            control={form.control}
                            render={({ field }) => {
                                const handleToggle = (goalId: string) => {
                                    const currentGoals = field.value || [];
                                    const isSelected = currentGoals.includes(goalId);

                                    if (isSelected) {
                                        field.onChange(currentGoals.filter((id) => id !== goalId));
                                    } else {
                                        field.onChange([...currentGoals, goalId]);
                                    }
                                };

                                return (
                                    <div className={s.optionsContainer}>
                                        {mountingTypesOptions.map((option) => {
                                            const room = field.value.find((r) => {
                                                return r === option.id;
                                            });
                                            const isSelected = !!room;

                                            return (
                                                <BathroomCard
                                                    key={option.id}
                                                    option={option}
                                                    isSelected={isSelected}
                                                    onToggle={() => {
                                                        return handleToggle(option.id);
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        />
                        {errors.mountingType && <p className={s.errorMessage}>{errors.mountingType.message}</p>}
                    </div>
                    {/* Concept style section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Concept | Style</h2>
                        <Controller
                            name="mountingType"
                            control={form.control}
                            render={({ field }) => {
                                const handleToggle = (goalId: string) => {
                                    const currentGoals = field.value || [];
                                    const isSelected = currentGoals.includes(goalId);

                                    if (isSelected) {
                                        field.onChange(currentGoals.filter((id) => id !== goalId));
                                    } else {
                                        field.onChange([...currentGoals, goalId]);
                                    }
                                };

                                return (
                                    <div className={s.optionsContainer}>
                                        {mountingTypesOptions.map((option) => {
                                            const room = field.value.find((r) => {
                                                return r === option.id;
                                            });
                                            const isSelected = !!room;

                                            return (
                                                <BathroomCard
                                                    key={option.id}
                                                    option={option}
                                                    isSelected={isSelected}
                                                    onToggle={() => {
                                                        return handleToggle(option.id);
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        />
                        {errors.mountingType && <p className={s.errorMessage}>{errors.mountingType.message}</p>}
                    </div>
                </div>
            </div>
            <div className={s.footer}>
                <Button className={s.btnBack} onClick={goToPreviousStep}>
                    Back
                </Button>
                <Button className={s.btnNext} onClick={submitHandler}>
                    Next
                </Button>
            </div>
        </div>
    );
};
