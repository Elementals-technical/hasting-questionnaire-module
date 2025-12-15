import { useState } from 'react';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import SmileIcon from '@/assets/icons/common/SmileIcon';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { useSendEmail } from '@/hooks/useSendEmail';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { QuoteRotator } from '@/modules/Home/components/shared/QuoteRotator/QuoteRotator';
import Slider from '@/modules/Home/components/shared/Slider/Slider';
import TagSelector from '@/modules/Home/components/shared/TagSelector/TagSelector';
import { colorTypesOptions, lookTypesOptions } from '../constants';
import { quotes } from '../ProductsStep/constants';
import { conceptStyleOptions, mountingTypesOptions, sinkTypesOptions, VANITIES_DEPTH_TYPES } from './constants';
import s from './VanitiesStep.module.scss';

export const VanitiesForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, setFormStepData, formData } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();

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
                firstname: name + '_ELEMENTALS_TEST',
                email: email,
                questionnaire_app: JSON.stringify(formData),
            };

            contactMutation.mutate(contactData);
            sendEmailMutation.mutate(formData);

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
                        {errors.width && <ErrorMessage>{errors.width.message}</ErrorMessage>}
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
                        {errors.mountingType && <ErrorMessage>{errors.mountingType.message}</ErrorMessage>}
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
                        {errors.conceptStyle && <ErrorMessage>{errors.conceptStyle.message}</ErrorMessage>}
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
                        {errors.sinkType && <ErrorMessage>{errors.sinkType.message}</ErrorMessage>}
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
                        {errors.color && <ErrorMessage>{errors.color.message}</ErrorMessage>}
                    </div>
                    {/* Look type style section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Look</h2>
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
                        {errors.look && <ErrorMessage>{errors.look.message}</ErrorMessage>}
                    </div>
                </div>
            </div>
            <MultiStepFormFooter onNext={submitHandler} />
        </div>
    );
};
