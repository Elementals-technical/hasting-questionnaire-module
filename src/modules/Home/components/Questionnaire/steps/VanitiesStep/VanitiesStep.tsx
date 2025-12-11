import { useState } from 'react';
import SmileIcon from '@/assets/icons/common/SmileIcon';
import BathroomCard from '@/shared/BathroomCard/BathroomCard';
import { useMultiStepFormContext, useMultiStepFormStepForm } from '@/shared/MultiStepForm/MultiStepFormContext';
import { QuoteRotator } from '@/shared/QuoteRotator/QuoteRotator';
import Slider from '@/shared/Slider/Slider';
import TagSelector from '@/shared/TagSelector/TagSelector';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { quotes } from '../ProductsStep/constants';
import {
    colorTypesOptions,
    conceptStyleOptions,
    lookTypesOptions,
    mountingTypesOptions,
    sinkTypesOptions,
    VANITIES_DEPTH_TYPES,
} from './constants';
import { Button } from '@/components/ui';
import s from './VanitiesStep.module.scss';

export const VanitiesForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, goToPreviousStep, setFormStepData, formData } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();

    const { name } = useMultiStepFormStepForm('name').form.getValues();
    const { email } = useMultiStepFormStepForm('email').form.getValues();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('vanities');

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('vanities', data);
            setShowOverlay(true);
            const contactData = {
                firstname: name + 'ELEMENTALS_TEST',
                email: email,
                questionnaire_app: JSON.stringify(formData),
            };

            contactMutation.mutate(contactData);

            setTimeout(() => {
                navigate({ to: '/result' });
            }, 5500);
        },
        (errors) => {
            console.log('❌ VALIDATION ERRORS:', errors);
        }
    );

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
                <div className={s.left}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={clsx(s.right, s.form)}>
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
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
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
                            name="conceptStyle"
                            control={form.control}
                            render={({ field }) => {
                                const handleToggle = (targetValue: string) => {
                                    const currentValue = field.value;
                                    const isSelected = currentValue === targetValue;

                                    if (isSelected) {
                                        field.onChange('');
                                    } else {
                                        field.onChange(targetValue);
                                    }
                                };

                                return (
                                    <div className={s.optionsContainer}>
                                        {conceptStyleOptions.map((option) => {
                                            const isSelected = field.value === option.id;

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
                        {errors.conceptStyle && <p className={s.errorMessage}>{errors.conceptStyle.message}</p>}
                    </div>

                    {/* Sink type style section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Sink type</h2>
                        <Controller
                            name="sinkType"
                            control={form.control}
                            render={({ field }) => {
                                const handleToggle = (targetValue: string) => {
                                    const currentValue = field.value;
                                    const isSelected = currentValue === targetValue;

                                    if (isSelected) {
                                        field.onChange('');
                                    } else {
                                        field.onChange(targetValue);
                                    }
                                };

                                return (
                                    <div className={s.optionsContainer}>
                                        {sinkTypesOptions.map((option) => {
                                            const isSelected = field.value === option.id;

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
                        {errors.sinkType && <p className={s.errorMessage}>{errors.sinkType.message}</p>}
                    </div>

                    {/* Color type style section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Color</h2>
                        <Controller
                            name="color"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        <TagSelector
                                            options={colorTypesOptions}
                                            selected={field.value}
                                            onSelect={(value) => field.onChange(value)}
                                        />
                                    </div>
                                );
                            }}
                        />
                        {errors.color && <p className={s.errorMessage}>{errors.color.message}</p>}
                    </div>
                    {/* Look type style section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Color</h2>
                        <Controller
                            name="look"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        <TagSelector
                                            options={lookTypesOptions}
                                            selected={field.value}
                                            onSelect={(value) => field.onChange(value)}
                                        />
                                    </div>
                                );
                            }}
                        />
                        {errors.look && <p className={s.errorMessage}>{errors.look.message}</p>}
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
