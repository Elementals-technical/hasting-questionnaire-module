import { useRef, useState } from 'react';
import CalculatingOverlay from '../../../shared/CalculatingOverlay/CalculatingOverlay';
import ErrorMessage from '../../../shared/ErrorMessage/ErrorMessage';
import { MultiStepFormFooter } from '../../../shared/FormFooter/MultiStepFormFooter';
import { mirrorsStepdata } from '../../../shared/MultiStepForm/types';
import Slider from '../../../shared/Slider/Slider';
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
import { SUBSTYLES } from '@/modules/Result/components/BonusSuggestions/constants';
import { determineDominantStyles } from '@/modules/Result/components/BonusSuggestions/utils';
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
    const { currentStep, setFormStepData, formData, goToStep } = useMultiStepFormContext();
    const contactMutation = useCreateHubspotContact();
    const sendEmailMutation = useSendEmail();
    const uploadFiles = useUploadFiles();
    const { remove, get } = useFileIndexedDBValue();

    const navigate = useNavigate();
    const { form } = useMultiStepFormStepForm('mirror');

    const { mutate: setFileToIndexedDB } = useSetFileToIndexedDB();
    // const { mutate: getFileFromIndexedDB } = useGetFileFromIndexedDB();

    const {
        formState: { errors },
    } = form;

    const submitHandler = form.handleSubmit(
        async (data) => {
            setFormStepData('mirror', data);
            setShowOverlay(true);
            const contactData = {
                firstname: formData.name.name + '_ELEMENTALS_TEST',
                email: formData.email.email,
                questionnaire_app: JSON.stringify(formData),
            };

            const emailData = {
                ...formData,
                aesthetics: determineDominantStyles(formData.roomStyle.rooms, SUBSTYLES),
            };

            contactMutation.mutate(contactData);
            // 2. Отримання файлів з IndexedDB
            const filesData = [
                ...(formData.aboutProject?.files?.map((i) => i.idInIndexedDB) || []),
                ...(formData.mirror?.files?.map((i) => i.idInIndexedDB) || []),
            ];

            const filePromises = filesData.map((fileId) => get('files', parseInt(fileId || '')));
            const results = await Promise.allSettled(filePromises);

            const successfulFiles = results
                .filter((result): result is PromiseFulfilledResult<File> => result.status === 'fulfilled')
                .map((result) => result.value);

            contactMutation.mutate(contactData);

            const uploadResponse = await uploadFiles.mutateAsync(successfulFiles);

            // Тепер у нас є дані від сервера (URL, ID тощо)
            // Відправляємо імейл, використовуючи результати завантаження
            sendEmailMutation.mutate({
                ...emailData,
                attachments: uploadResponse.results,
            });

            setTimeout(() => {
                navigate({ to: '/result' });
            }, 5500);
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
        <div className={s.wrap}>
            <div className={s.body}>
                <div className={s.left}>
                    <div className={s.title}>{currentStep.title}</div>
                    <div className={s.subtitle}>{currentStep.description}</div>
                </div>
                <div className={clsx(s.right, s.form)}>
                    {/* Shape type section */}
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
                        {errors.shape && <ErrorMessage>{errors.shape.message}</ErrorMessage>}
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
                                        min={MIRROR_WIDTH_LIMITS.MIN}
                                        max={MIRROR_WIDTH_LIMITS.MAX}
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
                            name="height"
                            control={form.control}
                            render={({ field }) => (
                                <div className={s.optionsContainer}>
                                    <Slider
                                        min={MIRROR_HEIGHT_LIMITS.MIN}
                                        max={MIRROR_HEIGHT_LIMITS.MAX}
                                        key={field.name}
                                        label={field.name}
                                        attributeValue={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    />
                                </div>
                            )}
                        />
                        {errors.height && <ErrorMessage>{errors.height.message}</ErrorMessage>}
                    </div>

                    {/* Type Section */}
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
                                                    goalId as mirrorsStepdata['type'][number]
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
                                                    className={`${s.optionButton} ${isSelected ? s.optionButtonSelected : ''}`}
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

                    {/* Features Section */}
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Features</h2>
                        <div className={s.featuresWrap}>
                            <div className={s.features}>
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
                                                            onClick={() => field.onChange(isSelected ? '' : option)}
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
                                {errors.defogger && <ErrorMessage>{errors.defogger.message}</ErrorMessage>}
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
                                                            onClick={() => field.onChange(isSelected ? '' : option)}
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
                                {errors.powerSensor && <ErrorMessage>{errors.powerSensor.message}</ErrorMessage>}
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
                                                            onClick={() => field.onChange(isSelected ? '' : option)}
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
                                {errors.dimmable && <ErrorMessage>{errors.dimmable.message}</ErrorMessage>}
                            </div>
                            <div className={s.divider} />
                            <div className={s.features}>
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
                                                            onClick={() => field.onChange(isSelected ? '' : option)}
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
                                {errors.lightTemperature && (
                                    <ErrorMessage>{errors.lightTemperature.message}</ErrorMessage>
                                )}
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
                                                            onClick={() => field.onChange(isSelected ? '' : option)}
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
                                {errors.backlit && <ErrorMessage>{errors.backlit.message}</ErrorMessage>}
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
                                                            onClick={() => field.onChange(isSelected ? '' : option)}
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
                                {errors.magnifying && <ErrorMessage>{errors.magnifying.message}</ErrorMessage>}
                            </div>
                        </div>
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
            </div>
            <MultiStepFormFooter
                onBack={() => goToStep('products')}
                onNext={submitHandler}
                isDisabled={!form.formState.isValid}
            />
        </div>
    );
};
