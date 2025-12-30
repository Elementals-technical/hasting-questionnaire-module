import { useRef, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import Divider from '../../../shared/Divider/Divider';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import Slider from '../../../shared/Slider/Slider';
import { useFilterCountertopsOptionsByRules } from './hook/useFilterOptionByRules';
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
import { colorTypesOptions, lookTypesOptions } from '../constants';
import {
    BASIN_QUANTITY_TYPES,
    COUNTERTOPS_DEPTH_TYPES,
    COUNTERTOPS_WIDTH_LIMITS,
    FEATURES_TYPES,
    sinkTypesOptions,
    styleCountertopsOptions,
    TOP_THICKNESS_COUNTERTOPS_TYPES,
} from './constants';
import { Button } from '@/components/ui/Button/Button';
import s from './CountertopsStep.module.scss';

export const CountertopsForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, handleProductStepSubmit, cleanUp, goToStep } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { remove, get } = useFileIndexedDBValue();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('countertops');

    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();
    // const { mutate: getFileFromIndexedDB } = useGetFileFromIndexedDB();

    const {
        formState: { errors },
    } = form;

    const filteredOptions = useFilterCountertopsOptionsByRules(form, BASIN_QUANTITY_TYPES);

    const submitHandler = form.handleSubmit(
        async (data) => {
            // Ми просто викликаємо функцію з контексту
            await handleProductStepSubmit('countertops', data, {
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
                    {/* Style section */}
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
                                    <div className={s.gridContainer}>
                                        {styleCountertopsOptions.map((option) => {
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
                        {errors.style && <ErrorMessage>{errors.style.message}</ErrorMessage>}
                    </div>
                    {/* Sink type style section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Sink Type</h2>
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
                                    <div className={s.gridContainer}>
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
                    {/* Size Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Size</h2>

                        <Controller
                            name="width"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.optionsContainer}>
                                    <Slider
                                        min={COUNTERTOPS_WIDTH_LIMITS.MIN}
                                        max={COUNTERTOPS_WIDTH_LIMITS.MAX}
                                        key={field.name}
                                        label={field.name}
                                        attributeValue={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    />
                                </div>
                            )}
                        />

                        <div className={s.featuresWrap}>
                            <div className={s.feature}>
                                <Controller
                                    name="depth"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>Depth</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {COUNTERTOPS_DEPTH_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
                                                            type="button"
                                                            onClick={() => field.onChange(!isSelected ? option : null)}
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
                                {errors.depth && <ErrorMessage>{errors.depth.message}</ErrorMessage>}
                            </div>
                            <Divider />
                            <div className={s.feature}>
                                <Controller
                                    name="topThickness"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>Top thickness</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {TOP_THICKNESS_COUNTERTOPS_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
                                                            type="button"
                                                            onClick={() => field.onChange(!isSelected ? option : null)}
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
                                {errors.topThickness && <ErrorMessage>{errors.topThickness.message}</ErrorMessage>}
                            </div>
                        </div>
                    </div>
                    {/* Basin quantity section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Basin Quantity</h2>
                        <Controller
                            name="basinQuantity"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.fieldWwrap}>
                                    {/* <span className={s.fieldLabel}>Basin Quantity</span> */}
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        {filteredOptions.basinQuantity.map((option) => {
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
                            )}
                        />
                        {errors.basinQuantity && <ErrorMessage>{errors.basinQuantity.message}</ErrorMessage>}
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
                                            selected={field.value || []}
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

                    {/* Feature Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Features</h2>
                        <Controller
                            name="features"
                            control={form.control}
                            render={({ field }) => {
                                const handleToggle = (feature: (typeof FEATURES_TYPES)[number]) => {
                                    const currentChallenges = field.value || [];
                                    const isSelected = currentChallenges.includes(feature);

                                    if (isSelected) {
                                        field.onChange(currentChallenges.filter((id) => id !== feature));
                                    } else {
                                        field.onChange([...currentChallenges, feature]);
                                    }
                                };

                                return (
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        {FEATURES_TYPES.map((option) => {
                                            const isSelected = field.value?.includes(option) || false;

                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => handleToggle(option)}
                                                    className={`${s.optionButton} ${isSelected ? s.optionButtonSelected : ''}`}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        />
                        {errors.features && <ErrorMessage>{errors.features.message}</ErrorMessage>}
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
