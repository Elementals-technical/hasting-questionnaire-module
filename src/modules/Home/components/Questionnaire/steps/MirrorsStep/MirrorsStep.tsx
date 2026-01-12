// MirrorForm.tsx - Пример использования хука

import { useRef, useState } from 'react';
import FormStepLayout from '../../../layouts/FormStepLayout/FormStepLayout';
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import Divider from '../../../shared/Divider/Divider';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import Slider from '../../../shared/Slider/Slider';
import { useFilterMirrorsOptionsByRules } from './hook/useFilteredMirrorsOptionsByRules';
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
import { colorTypesOptions, lookTypesOptions } from '../constants';
import {
    MIRROR_HEIGHT_LIMITS,
    MIRROR_WIDTH_LIMITS,
    MIRRORS_BACKLIT_TYPES,
    MIRRORS_DEFOGGER_TYPES,
    MIRRORS_DIMMABLE_TYPES,
    MIRRORS_LIGHT_TEMPERATURE_TYPES,
    MIRRORS_POWER_SENSOR_TYPES,
    MIRRORS_TYPES,
    shapeMirrorsOptions,
} from './constants';
import { Button } from '@/components/ui/Button/Button';
import s from './MirrorsStep.module.scss';

export const MirrorForm = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { currentStep, handleProductStepSubmit, cleanUp, goToStep } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { remove, get } = useFileIndexedDBValue();
    const navigate = useNavigate();

    const { form } = useMultiStepFormStepForm('mirror');
    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useFilterMirrorsOptionsByRules(form);

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit(
        async (data) => {
            await handleProductStepSubmit('mirror', data, {
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
                    {/* Shape Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Shape</h2>
                        <Controller
                            name="shape"
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
                                        {shapeMirrorsOptions.map((option) => {
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
                        {errors.shape && <ErrorMessage>{errors.shape.message}</ErrorMessage>}
                    </div>

                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Size</h2>

                        {/* Уведомление о недоступности размеров */}
                        {filteredOptions.sizeDisabledMessage && (
                            <div className={s.infoMessage}>ℹ️ {filteredOptions.sizeDisabledMessage}</div>
                        )}

                        <Controller
                            name="width"
                            control={form.control}
                            render={({ field }) => (
                                <div
                                    className={clsx(s.optionsContainer, {
                                        [s.disabled]: filteredOptions.isSizeDisabled,
                                    })}
                                >
                                    <Slider
                                        min={MIRROR_WIDTH_LIMITS.MIN}
                                        max={MIRROR_WIDTH_LIMITS.MAX}
                                        key={field.name}
                                        label={field.name}
                                        attributeValue={field.value}
                                        onValueChange={(value) => {
                                            if (filteredOptions.shouldSyncDimensions) {
                                                filteredOptions.handleWidthChange(value);
                                                return;
                                            }

                                            if (!filteredOptions.isSizeDisabled) {
                                                field.onChange(value);
                                                return;
                                            }
                                        }}
                                        disabled={filteredOptions.isSizeDisabled}
                                    />
                                </div>
                            )}
                        />
                        {errors.width && <ErrorMessage>{errors.width.message}</ErrorMessage>}

                        <Controller
                            name="height"
                            control={form.control}
                            render={({ field }) => (
                                <div
                                    className={clsx(s.optionsContainer, {
                                        [s.disabled]: filteredOptions.isSizeDisabled,
                                    })}
                                >
                                    <Slider
                                        min={MIRROR_HEIGHT_LIMITS.MIN}
                                        max={MIRROR_HEIGHT_LIMITS.MAX}
                                        key={field.name}
                                        label={field.name}
                                        attributeValue={field.value}
                                        onValueChange={(value) => {
                                            if (filteredOptions.shouldSyncDimensions) {
                                                filteredOptions.handleHeightChange(value);
                                                return;
                                            }

                                            if (!filteredOptions.isSizeDisabled) {
                                                field.onChange(value);
                                                return;
                                            }
                                        }}
                                        disabled={filteredOptions.isSizeDisabled}
                                    />
                                </div>
                            )}
                        />
                        {errors.height && <ErrorMessage>{errors.height.message}</ErrorMessage>}
                    </div>

                    {/* Type Section - Multi-select */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Type</h2>
                        <Controller
                            name="type"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.fieldWwrap}>
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        {MIRRORS_TYPES.map((option) => {
                                            const handleToggle = (goalId: string) => {
                                                const currentGoals = field.value || [];
                                                const isSelected = currentGoals.includes(
                                                    goalId as (typeof field.value)[number]
                                                );

                                                if (isSelected) {
                                                    field.onChange(currentGoals.filter((id) => id !== goalId));
                                                } else {
                                                    field.onChange([...currentGoals, goalId]);
                                                }
                                            };

                                            const isSelected = field.value?.includes(option) || false;

                                            return (
                                                <Button
                                                    key={option}
                                                    onClick={() => handleToggle(option)}
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
                        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
                    </div>

                    {/* Features Section - Все опциональные */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Features</h2>
                        <div className={s.featuresWrap}>
                            <div className={s.features}>
                                {/* Defogger - Optional */}
                                <Controller
                                    name="defogger"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>Defogger</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {MIRRORS_DEFOGGER_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
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

                                {/* Power Sensor - Optional */}
                                <Controller
                                    name="powerSensor"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>On/off sensor</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {MIRRORS_POWER_SENSOR_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
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

                                {/* Dimmable - Optional */}
                                <Controller
                                    name="dimmable"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>Dimmable</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {MIRRORS_DIMMABLE_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
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
                            </div>
                            <Divider />
                            <div className={s.features}>
                                {/* Light Temperature - Optional */}
                                <Controller
                                    name="lightTemperature"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>LED Light Temperature</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {MIRRORS_LIGHT_TEMPERATURE_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
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

                                {/* Backlit - Optional */}
                                <Controller
                                    name="backlit"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>Backlit</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {MIRRORS_BACKLIT_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
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

                                {/* Magnifying - Optional */}
                                <Controller
                                    name="magnifying"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className={s.fieldWwrap}>
                                            <span className={s.fieldLabel}>Magnifying Mirror</span>
                                            <div className={clsx(s.optionsContainer, 'justify-start')}>
                                                {MIRRORS_DEFOGGER_TYPES.map((option) => {
                                                    const isSelected = field.value === option;

                                                    return (
                                                        <Button
                                                            key={option}
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
                            </div>
                        </div>
                    </div>
                    {filteredOptions.shouldShowColorField && (
                        <div className={s.section}>
                            <h2 className={s.sectionTitle}>Color</h2>
                            <Controller
                                name="color"
                                control={form.control}
                                render={({ field }) => (
                                    <div className={clsx(s.optionsContainer, 'justify-start')}>
                                        <TagSelector
                                            options={colorTypesOptions}
                                            selected={field.value || []}
                                            onSelect={(value) => field.onChange(value)}
                                        />
                                    </div>
                                )}
                            />
                            {errors.color && <ErrorMessage>{errors.color.message}</ErrorMessage>}
                        </div>
                    )}

                    {filteredOptions.shouldShowLookField && (
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
                    )}

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
