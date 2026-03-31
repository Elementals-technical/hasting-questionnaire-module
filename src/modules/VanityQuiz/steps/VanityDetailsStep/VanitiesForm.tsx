import React, { useEffect, useMemo, useRef } from 'react';
import AttachIcon from '@/assets/icons/common/AttachIcon';
import CircleIcon from '@/assets/icons/common/CircleIcon';
import CheckIcon from '@/assets/icons/common/DoneIcon';
import { useFileIndexedDBValue, useSetFileToIndexedDB } from '@/lib/indexedDB/utils';
import clsx from 'clsx';
import { FileIcon, XIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useFilterVanitiesOptionsByRules } from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/hooks/useFilterVanitiesOptionsByRules';
import FormStepLayout from '@/modules/Home/components/layouts/FormStepLayout/FormStepLayout';
import { colorTypesOptions, lookTypesOptions } from '@/modules/Home/components/Questionnaire/steps/constants';
import { PRODUCTS_TYPES } from '@/modules/Home/components/Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import {
    conceptStyleOptions,
    mountingTypesOptions,
    numberOfBasinsOptions,
    sinkTypesOptions,
    VANITIES_DEPTH_TYPES,
    VANITIES_WIDTH_LIMITS,
} from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/constants';
import s from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/VanitiesStep.module.scss';
import BathroomCard from '@/modules/Home/components/shared/BathroomCard/BathroomCard';
import ErrorMessage from '@/modules/Home/components/shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '@/modules/Home/components/shared/FormFooter/MultiStepFormFooter';
import { ACCEPT_FILES, MULTI_STEP_FORM_INITIAL_STATE } from '@/modules/Home/components/shared/MultiStepForm/constants';
import {
    useMultiStepFormContext,
    useMultiStepFormStepForm,
} from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { VanitiesStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import Slider from '@/modules/Home/components/shared/Slider/Slider';
import TagSelector from '@/modules/Home/components/shared/TagSelector/TagSelector';
import { Button } from '@/components/ui/Button/Button';

const cloneVanityDefaults = (value: VanitiesStepData): VanitiesStepData => {
    return structuredClone(value);
};

export const VanitiesForm = () => {
    const {
        currentStep,
        goToNextStep,
        setFormStepDataBatch,
        formData,
        currentProductInstanceIndex,
        goToProductInstance,
    } = useMultiStepFormContext();
    const { form } = useMultiStepFormStepForm('vanities');
    const { conceptStyle, numberOfBasins } = useFilterVanitiesOptionsByRules(
        form,
        numberOfBasinsOptions,
        conceptStyleOptions
    );

    const { remove } = useFileIndexedDBValue();
    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const {
        formState: { errors },
    } = form;

    const vanityCount = formData.products.products.find((p) => p.id === PRODUCTS_TYPES._VANITIES)?.count ?? 1;
    const visitedUntilIndex = useMemo(() => {
        const entries = formData.vanitiesEntries ?? [];
        let lastSavedIndex = -1;
        entries.forEach((entry, idx) => {
            const hasFiles = Array.isArray(entry.files) && entry.files.length > 0;
            const hasText = Boolean(entry.additionalInfo?.trim());
            const hasSelections =
                (Array.isArray(entry.conceptStyle) && entry.conceptStyle.length > 0) ||
                (Array.isArray(entry.look) && entry.look.length > 0) ||
                (Array.isArray(entry.color) && entry.color.length > 0);
            if (hasFiles || hasText || hasSelections) {
                lastSavedIndex = idx;
            }
        });

        return Math.max(currentProductInstanceIndex, lastSavedIndex, 0);
    }, [currentProductInstanceIndex, formData.vanitiesEntries]);

    useEffect(() => {
        const existing = formData.vanitiesEntries ?? [];
        if (existing.length === vanityCount) {
            return;
        }

        const template = MULTI_STEP_FORM_INITIAL_STATE.vanities;
        const resized: VanitiesStepData[] = Array.from({ length: vanityCount }, (_, idx) => {
            return existing[idx] ?? cloneVanityDefaults(template);
        });

        setFormStepDataBatch({
            vanitiesEntries: resized,
            vanities: resized[currentProductInstanceIndex] ?? resized[0]!,
        });
    }, [currentProductInstanceIndex, formData.vanitiesEntries, setFormStepDataBatch, vanityCount]);

    const submitHandler = form.handleSubmit((data) => {
        const existingEntries = formData.vanitiesEntries ?? [];
        const template = MULTI_STEP_FORM_INITIAL_STATE.vanities;
        const currentEntriesLength = Math.max(existingEntries.length, vanityCount);

        const resized: VanitiesStepData[] = Array.from({ length: currentEntriesLength }, (_, idx) => {
            return existingEntries[idx] ?? cloneVanityDefaults(template);
        });

        resized[currentProductInstanceIndex] = data;

        const isLast = currentProductInstanceIndex >= vanityCount - 1;
        const nextEntryIndex = currentProductInstanceIndex + 1;

        setFormStepDataBatch({
            vanitiesEntries: resized,
            vanities: isLast ? data : (resized[nextEntryIndex] ?? cloneVanityDefaults(template)),
        });

        goToNextStep();
    });

    return (
        <>
            <div className={s.vanityStepperWrap}>
                <div className={s.vanityStepper} role="tablist" aria-label="Vanity steps">
                    {Array.from({ length: vanityCount }, (_, idx) => {
                        const isCurrent = idx === currentProductInstanceIndex;
                        const isVisited = idx <= visitedUntilIndex;
                        const isCompleted = idx < currentProductInstanceIndex || (isVisited && !isCurrent);
                        const isLast = idx === vanityCount - 1;

                        return (
                            <React.Fragment key={idx}>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={isCurrent}
                                    aria-disabled={!isVisited}
                                    className={clsx(s.vanityStepItem, {
                                        [s.vanityStepCurrent]: isCurrent,
                                        [s.vanityStepCompleted]: isCompleted,
                                        [s.vanityStepUnvisited]: !isVisited && !isCurrent,
                                    })}
                                    onClick={() => {
                                        if (!isVisited || isCurrent) return;
                                        goToProductInstance('vanities', idx);
                                    }}
                                    disabled={!isVisited && !isCurrent}
                                >
                                    <span className={s.vanityStepDot}>
                                        {isCompleted && <CheckIcon />}
                                        {isCurrent && (
                                            <>
                                                <CircleIcon />
                                                <span className={s.vanityStepDotInner} />
                                            </>
                                        )}
                                        {!isCompleted && !isCurrent && <span className={s.vanityStepDotInner} />}
                                    </span>
                                    <span className={s.vanityStepLabel}>{`Vanity ${idx + 1}`}</span>
                                </button>
                                {!isLast && (
                                    <span
                                        className={clsx(s.vanityStepConnector, {
                                            [s.vanityStepConnectorActive]: idx < currentProductInstanceIndex,
                                        })}
                                        aria-hidden="true"
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <FormStepLayout title={currentStep.title} description={currentStep.description}>
                <div className={s.form}>
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Size</h2>
                        <Controller
                            name="width"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.optionsContainer}>
                                    <Slider
                                        min={VANITIES_WIDTH_LIMITS.MIN}
                                        max={VANITIES_WIDTH_LIMITS.MAX}
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
                                        {mountingTypesOptions.map((option) => {
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

                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Basin Quantity</h2>
                        <Controller
                            name="numberOfBasins"
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
                                        {numberOfBasins.map((option) => {
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
                                        {numberOfBasins.length < numberOfBasinsOptions.length && (
                                            <p className={s.hint}>
                                                Double basin is only available for widths 48&quot; and above
                                            </p>
                                        )}
                                    </div>
                                );
                            }}
                        />
                        {errors.numberOfBasins && <ErrorMessage>{errors.numberOfBasins.message}</ErrorMessage>}
                    </div>

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
                                    <div className={s.optionsContainer}>
                                        {conceptStyle.map((option) => {
                                            const isSelected = field.value.includes(
                                                option.id as VanitiesStepData['conceptStyle'][number]
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
                                        field.onChange(undefined);
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
                                                            // Ignore and keep user on the same entry.
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

            <MultiStepFormFooter onNext={submitHandler} isDisabled={!form.formState.isValid} />
        </>
    );
};
