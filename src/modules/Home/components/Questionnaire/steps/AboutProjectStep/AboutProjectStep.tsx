import { useState } from 'react';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { Controller } from 'react-hook-form';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { challengesOptions, goalsOptions, projectTypeOptions } from './constants';
import s from './AboutProjectStep.module.scss';

export const AboutProjectForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { form } = useMultiStepFormStepForm('aboutProject');

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit((data) => {
        setFormStepData('aboutProject', data);
        setShowOverlay(true);

        setTimeout(() => {
            setShowOverlay(false);
            goToNextStep();
        }, 2500);
    });

    if (showOverlay) {
        return (
            <div className={s.greetingOverlay}>
                <div className={s.greetingText}>Almost there! Let's talk solutions</div>
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
                <div className={s.right}>
                    {/* Project Type Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Project type</h2>
                        <Controller
                            name="projectType"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.optionsContainer}>
                                    {projectTypeOptions.map((option) => {
                                        const isSelected = field.value === option.id;

                                        return (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => field.onChange(option.id)}
                                                className={`${s.optionButton} ${isSelected ? s.optionButtonSelected : ''}`}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        {errors.projectType && <ErrorMessage>{errors.projectType.message}</ErrorMessage>}
                    </div>

                    {/* Goals Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Goals</h2>
                        <Controller
                            name="goals"
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
                                        {goalsOptions.map((option) => {
                                            const isSelected = field.value?.includes(option.id) || false;

                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => handleToggle(option.id)}
                                                    className={`${s.optionButton} ${isSelected ? s.optionButtonSelected : ''}`}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        />
                        {errors.goals && <ErrorMessage>{errors.goals.message}</ErrorMessage>}
                    </div>

                    {/* Challenges Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Challenges</h2>
                        <Controller
                            name="challenges"
                            control={form.control}
                            render={({ field }) => {
                                const handleToggle = (challengeId: string) => {
                                    const currentChallenges = field.value || [];
                                    const isSelected = currentChallenges.includes(challengeId);

                                    if (isSelected) {
                                        field.onChange(currentChallenges.filter((id) => id !== challengeId));
                                    } else {
                                        field.onChange([...currentChallenges, challengeId]);
                                    }
                                };

                                return (
                                    <div className={s.optionsContainer}>
                                        {challengesOptions.map((option) => {
                                            const isSelected = field.value?.includes(option.id) || false;

                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => handleToggle(option.id)}
                                                    className={`${s.optionButton} ${isSelected ? s.optionButtonSelected : ''}`}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        />
                        {errors.challenges && <ErrorMessage>{errors.challenges.message}</ErrorMessage>}
                    </div>
                </div>
            </div>
            <MultiStepFormFooter onNext={submitHandler} />
        </div>
    );
};
