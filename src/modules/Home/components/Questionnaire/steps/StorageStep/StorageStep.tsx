import { useRef, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import BathroomCard from '../../../shared/BathroomCard/BathroomCard';
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { StorageStepdata } from '../../../shared/MultiStepForm/types';
import { OptionTooltip } from '../../../shared/OptionTooltip/OptionTooltip';
import Slider from '../../../shared/Slider/Slider';
import TagSelector from '../../../shared/TagSelector/TagSelector';
import AttachIcon from '@/assets/icons/common/AttachIcon';
import FileIcon from '@/assets/icons/common/FileIcon';
import InfoIcon from '@/assets/icons/common/InfoIcon';
import XIcon from '@/assets/icons/common/XIcon';
import { useFileIndexedDBValue, useSetFileToIndexedDB } from '@/lib/indexedDB/utils';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useUploadFiles } from '@/hooks/useUploadFiles';
import { useFilterStorageStepOptionsByRules } from './hooks/useFilterStorageStepOptionsByRules';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import {
    colorTypesOptions,
    conceptStyleOptions,
    lookTypesOptions,
    STORAGE_ARRANGEMENT_TOOLTIP_TEXT,
    STORAGE_DEPTH_TYPES,
    STORAGE_HEIGHT_LIMITS,
    STORAGE_WIDTH_LIMITS,
    storageArrangementOptions,
} from './constants';
import { Button } from '@/components/ui';
import s from './StorageStep.module.scss';

export const StorageForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const { currentStep, handleProductStepSubmit, cleanUp, goToStep } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { get, remove } = useFileIndexedDBValue();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('storage');

    const {
        formState: { errors },
    } = form;

    const { conceptStyle } = useFilterStorageStepOptionsByRules(form, conceptStyleOptions);

    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();

    const submitHandler = form.handleSubmit(
        async (data) => {
            // Ми просто викликаємо функцію з контексту
            await handleProductStepSubmit('storage', data, {
                setShowOverlay,
                get,
                contactMutation,
                uploadFiles,
                sendEmailMutation,
                navigate,
                cleanUp,
            });
        },
        (errors) => {
            console.log('❌ VALIDATION ERRORS:', errors);
        }
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    if (showOverlay) {
        return <CalculatingOverlay />;
    }

    return (
        <>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <div className={s.form}>
                    {/* Storage arr. section */}
                    <div className={s.section}>
                        <div className={s.header}>
                            <h2 className={s.sectionTitle}>Storage Arrangement</h2>
                            <OptionTooltip className={s.sectionTooltip} tooltipText={STORAGE_ARRANGEMENT_TOOLTIP_TEXT}>
                                <InfoIcon />
                            </OptionTooltip>
                        </div>
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
                                    <div className={s.gridContainer}>
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
                                const handleToggle = (value: string) => {
                                    const current: string[] = field.value || [];
                                    const exists = current.includes(value);

                                    if (exists) {
                                        field.onChange(current.filter((v) => v !== value));
                                    } else {
                                        field.onChange([...current, value]);
                                    }
                                };

                                return (
                                    <div className={s.gridContainer}>
                                        {conceptStyle.map((option) => {
                                            const isSelected = field.value.includes(
                                                option.id as StorageStepdata['conceptStyle'][number]
                                            );

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
                                        min={STORAGE_HEIGHT_LIMITS.MIN}
                                        max={STORAGE_HEIGHT_LIMITS.MAX}
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
                                        min={STORAGE_WIDTH_LIMITS.MIN}
                                        max={STORAGE_WIDTH_LIMITS.MAX}
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
                                            selected={field.value || []}
                                            onSelect={(value) => field.onChange(value)}
                                        />
                                    </div>
                                );
                            }}
                        />
                        {errors.look && <ErrorMessage>{errors.look.message}</ErrorMessage>}
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
                                                    setFileToIndexedDB(file, {
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
            </FormStepLayout>
            <MultiStepFormFooter
                onBack={() => goToStep('products')}
                onNext={submitHandler}
                isDisabled={!form.formState.isValid}
            />
        </>
    );
};
