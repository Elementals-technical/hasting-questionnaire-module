import { useState } from 'react';
import BathroomCard from '../../../shared/BathroomCard/BathroomCard';
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import Slider from '../../../shared/Slider/Slider';
import TagSelector from '../../../shared/TagSelector/TagSelector';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { useSendEmail } from '@/hooks/useSendEmail';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import {
    colorTypesOptions,
    conceptStyleOptions,
    lookTypesOptions,
    STORAGE_DEPTH_TYPES,
    storageArrangementOptions,
} from './constants';
import s from './StorageStep.module.scss';

export const StorageForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const { currentStep, setFormStepData, formData } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();

    const { name } = useMultiStepFormStepForm('name').form.getValues();
    const { email } = useMultiStepFormStepForm('email').form.getValues();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('storage');

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit(
        (data) => {
            setFormStepData('storage', data);
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
        return <CalculatingOverlay />;
    }

    return (
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.left}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={clsx(s.right, s.form)}>
                    {/* Storage arr. section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Concept | Style</h2>
                        <Controller
                            name="storageArrangement"
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
                                        {storageArrangementOptions.map((option) => {
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
                        {errors.storageArrangement && <ErrorMessage>{errors.storageArrangement.message}</ErrorMessage>}
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

                    {/* Size Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Approx size</h2>
                        <Controller
                            name="height"
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
                        {errors.height && <ErrorMessage>{errors.height.message}</ErrorMessage>}
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
                        {errors.width && <ErrorMessage>{errors.width.message}</ErrorMessage>}
                        <Controller
                            name="depth"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.fieldWwrap}>
                                    <span className={s.fieldLabel}>Depth</span>
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        {STORAGE_DEPTH_TYPES.map((option) => {
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
                        {errors.depth && <ErrorMessage>{errors.depth.message}</ErrorMessage>}
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
