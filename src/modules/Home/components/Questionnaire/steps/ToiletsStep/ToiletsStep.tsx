import { useRef, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
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
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import TagSelector from '@/modules/Home/components/shared/TagSelector/TagSelector';
import { ACCEPT_FILES } from '../../../shared/MultiStepForm/constants';
import { colorTypesOptions } from '../constants';
import { styleOptions, TOILETS_SOFT_CLOSE_SEAT_TYPES } from './constants';
import { Button } from '@/components/ui/Button/Button';
import s from './ToiletsStep.module.scss';

export const ToiletsForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, handleProductStepSubmit, cleanUp, goToStep } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { remove, get } = useFileIndexedDBValue();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('toilets');

    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();
    // const { mutate: getFileFromIndexedDB } = useGetFileFromIndexedDB();

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit(
        async (data) => {
            await handleProductStepSubmit('toilets', data, {
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
                    {/* Mounting type section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Mounting Type</h2>
                        <Controller
                            name="mountingType"
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
                    {/* Soft Close Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Features</h2>
                        <Controller
                            name="softCloseSeat"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.fieldWwrap}>
                                    <span className={s.fieldLabel}>Soft-close seat</span>
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        {TOILETS_SOFT_CLOSE_SEAT_TYPES.map((option) => {
                                            const isSelected = field.value === option;

                                            return (
                                                <Button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => field.onChange(isSelected ? null : option)}
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
                        {errors.softCloseSeat && <ErrorMessage>{errors.softCloseSeat.message}</ErrorMessage>}
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
                                            accept={ACCEPT_FILES}
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
