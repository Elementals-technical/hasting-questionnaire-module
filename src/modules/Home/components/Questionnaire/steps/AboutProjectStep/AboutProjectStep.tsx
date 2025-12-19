import { useRef, useState } from 'react';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import AttachIcon from '@/assets/icons/common/AttachIcon';
import FileIcon from '@/assets/icons/common/FileIcon';
import XIcon from '@/assets/icons/common/XIcon';
import { useFileIndexedDBValue, useSetFileToIndexedDB } from '@/lib/indexedDB/utils';
import { Controller } from 'react-hook-form';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { challengesOptions, goalsOptions, projectTypeOptions } from './constants';
import { Button } from '@/components/ui';
import s from './AboutProjectStep.module.scss';

export const AboutProjectForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, goToNextStep, setFormStepData } = useMultiStepFormContext();

    const { remove } = useFileIndexedDBValue();

    const { form } = useMultiStepFormStepForm('aboutProject');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const { mutate: uploadInsuranceLicenseFileToIndexedDB } = useSetFileToIndexedDB();

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

                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>What else should we know</h2>
                        {/* Text Area */}
                        <Controller
                            name="additionalInfo"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.textareaWrapper}>
                                    <textarea
                                        className={s.textarea}
                                        placeholder="These insights are gold for our team. Don't be shy!"
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        rows={8}
                                    />
                                    <Button
                                        type="button"
                                        className={s.attachButton}
                                        onClick={handleAttachClick}
                                        aria-label="Attach files"
                                    >
                                        <AttachIcon className={s.attachIcon} />
                                    </Button>
                                </div>
                            )}
                        />

                        {/* Files */}
                        <Controller
                            name="files"
                            control={form.control}
                            render={({ field }) => {
                                const handleRemoveFile = (indexedDbId?: string) => {
                                    if (!indexedDbId) return;

                                    const currentFiles = field.value || [];

                                    remove('files', parseInt(indexedDbId));
                                    field.onChange(currentFiles.filter((item) => item.idInIndexedDB !== indexedDbId));
                                };

                                return (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            multiple
                                            onChange={(e) => {
                                                const selectedFiles = Array.from(e.currentTarget.files || []);

                                                selectedFiles.forEach((file) => {
                                                    uploadInsuranceLicenseFileToIndexedDB(file, {
                                                        onSuccess(response) {
                                                            const currentFiles = Array.isArray(field.value)
                                                                ? field.value
                                                                : [];

                                                            // Додаємо новий файл до масиву
                                                            field.onChange([
                                                                ...currentFiles,
                                                                {
                                                                    idInIndexedDB: response?.toString() ?? undefined,
                                                                    name: file.name,
                                                                    size: file.size,
                                                                },
                                                            ]);
                                                        },
                                                        onError() {
                                                            console.error(`Файл ${file.name} не вдалося завантажити`);
                                                        },
                                                    });
                                                });
                                            }}
                                            className={s.fileInput}
                                            accept="image/*,.pdf,.doc,.docx"
                                        />

                                        {field.value && field.value.length > 0 && (
                                            <div className={s.filesList}>
                                                {field.value.map((fileData, index) => (
                                                    <div key={`${fileData.name}-${index}`} className={s.fileItem}>
                                                        <div className={s.fileInfo}>
                                                            <FileIcon className={s.fileIcon} />
                                                            <span className={s.fileName}>{fileData.name}</span>
                                                        </div>
                                                        <Button
                                                            onClick={() => handleRemoveFile(fileData.idInIndexedDB)}
                                                            className={s.removeButton}
                                                            aria-label="Remove file"
                                                        >
                                                            <XIcon />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
            <MultiStepFormFooter onNext={submitHandler} />
        </div>
    );
};
