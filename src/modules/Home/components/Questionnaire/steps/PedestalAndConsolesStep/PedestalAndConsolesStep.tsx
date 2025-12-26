// PedestalAndConsolesForm.tsx - Пример использования хука

import { useRef, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
// Импорты компонентов
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import Slider from '../../../shared/Slider/Slider';
import { useFilterPedestalOptionsByRules } from './hook/useFilterPedestalOptionsByRules';
// ИМПОРТ НАШЕГО ХУКА

import AttachIcon from '@/assets/icons/common/AttachIcon';
import { useFileIndexedDBValue, useSetFileToIndexedDB } from '@/lib/indexedDB/utils';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { FileIcon, XIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useUploadFiles } from '@/hooks/useUploadFiles';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
// Импорты хуков
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import TagSelector from '@/modules/Home/components/shared/TagSelector/TagSelector';
// Импорты констант
import { colorTypesOptions, lookTypesOptions } from '../constants';
import {
    INTEGRATED_STORAGE_TYPES,
    PEDESTAL_AND_CONSOLES_DEPTH_LIMITS,
    PEDESTAL_AND_CONSOLES_SHAPE_TYPES,
    styleOptions,
} from './constants';
import { Button } from '@/components/ui/Button/Button';
import s from './PedestalAndConsolesStep.module.scss';

export const PedestalAndConsolesForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, handleProductStepSubmit, cleanUp, goToStep } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { remove, get } = useFileIndexedDBValue();
    const navigate = useNavigate();

    const { form } = useMultiStepFormStepForm('pedestalAndConsoles');
    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useFilterPedestalOptionsByRules(form, INTEGRATED_STORAGE_TYPES);

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit(
        async (data) => {
            await handleProductStepSubmit('pedestalAndConsoles', data, {
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
                    {/* Style Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Concept | Style</h2>
                        <Controller
                            name="style"
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
                                        {styleOptions.map((option) => {
                                            const isSelected = field.value === option.id;

                                            return (
                                                <BathroomCard
                                                    key={option.id}
                                                    option={option}
                                                    isSelected={isSelected}
                                                    onToggle={() => handleToggle(option.id)}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        />
                        {errors.style && <ErrorMessage>{errors.style.message}</ErrorMessage>}
                    </div>

                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Size</h2>

                        {/* Подсказка о лимите для Pedestal */}
                        {filteredOptions.widthLimits.max === 25 && (
                            <p className={s.hint}>💡 Maximum width for Pedestal style is 25"</p>
                        )}

                        <Controller
                            name="width"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.optionsContainer}>
                                    <Slider
                                        min={filteredOptions.widthLimits.min}
                                        max={filteredOptions.widthLimits.max}
                                        key={`width-${filteredOptions.widthLimits.max}`} // Key для перерендера
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
                                <div className={s.optionsContainer}>
                                    <Slider
                                        min={PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MIN}
                                        max={PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MAX}
                                        key={field.name}
                                        label={field.name}
                                        attributeValue={field.value || PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MIN}
                                        onValueChange={(value) => field.onChange(value)}
                                    />
                                </div>
                            )}
                        />
                        {errors.depth && <ErrorMessage>{errors.depth.message}</ErrorMessage>}
                    </div>

                    {/* Shape Section - Optional */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Shape</h2>
                        <Controller
                            name="shape"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.fieldWwrap}>
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        {PEDESTAL_AND_CONSOLES_SHAPE_TYPES.map((option) => {
                                            const isSelected = field.value === option;

                                            return (
                                                <Button
                                                    key={option}
                                                    onClick={() => field.onChange(option)}
                                                    className={clsx(s.optionButton, {
                                                        [s.optionButtonSelected]: isSelected,
                                                    })}
                                                >
                                                    {option}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        />
                        {errors.shape && <ErrorMessage>{errors.shape.message}</ErrorMessage>}
                    </div>

                    {/* Color Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Color</h2>
                        <Controller
                            name="color"
                            control={form.control}
                            render={({ field }) => (
                                <div className={clsx(s.optionsContainer, 'justify-start')}>
                                    <TagSelector
                                        options={colorTypesOptions}
                                        selected={field.value}
                                        onSelect={(value) => field.onChange(value)}
                                    />
                                </div>
                            )}
                        />
                        {errors.color && <ErrorMessage>{errors.color.message}</ErrorMessage>}
                    </div>

                    {/* Look Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Look</h2>
                        <Controller
                            name="look"
                            control={form.control}
                            render={({ field }) => (
                                <div className={clsx(s.optionsContainer, 'justify-start')}>
                                    <TagSelector
                                        options={lookTypesOptions}
                                        selected={field.value || []}
                                        onSelect={(value) => field.onChange(value)}
                                    />
                                </div>
                            )}
                        />
                        {errors.look && <ErrorMessage>{errors.look.message}</ErrorMessage>}
                    </div>

                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Integrated storage</h2>
                        <Controller
                            name="integratedStorage"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <div className={s.fieldWwrap}>
                                        <div className={clsx(s.optionsContainer, 'justify-start')}>
                                            {filteredOptions.integratedStorage.map((option) => {
                                                const isSelected = field.value === option;

                                                return (
                                                    <Button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => field.onChange(option)}
                                                        className={clsx(s.optionButton, {
                                                            [s.optionButtonSelected]: isSelected,
                                                        })}
                                                    >
                                                        {option}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Подсказка, если опции отфильтрованы */}
                                    {filteredOptions.integratedStorage.length < INTEGRATED_STORAGE_TYPES.length && (
                                        <p className={s.hint}>
                                            💡 Integrated Drawer is not available for Pedestal style
                                        </p>
                                    )}
                                </>
                            )}
                        />
                        {errors.integratedStorage && <ErrorMessage>{errors.integratedStorage.message}</ErrorMessage>}
                    </div>

                    {/* Additional Info - Optional */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>What else should we know</h2>
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

                        {/* Files Controller */}
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
