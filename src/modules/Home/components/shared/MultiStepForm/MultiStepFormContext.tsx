import React from 'react';
import {
    AnimationDirection,
    FileMetadata,
    FinalActions,
    MultiStepForm,
    MultiStepFormStep,
    MultiStepFormStepId,
    ProductStepsData,
    StepWithFiles,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCounter, useLocalStorageValue, useToggle } from '@react-hookz/web';
import { flushSync } from 'react-dom';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSafeContext } from '@/hooks/useSafeContext';
import { SUBSTYLES } from '@/modules/Result/components/BonusSuggestions/constants';
import { determineDominantStyles } from '@/modules/Result/components/BonusSuggestions/utils';
import { FileUploadResponse, FileUploadResult } from '@/api/hubspot/api';
import { PRODUCTS_TYPES } from '../../Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import { MULTI_STEP_FORM_INITIAL_STATE, MULTI_STEP_FORM_STEPS } from './constants';

type MultiStepFormContextType = {
    formData: MultiStepForm;
    steps: MultiStepFormStep[];
    currentStepIndex: number;
    currentStep: MultiStepFormStep;
    canGoBack: boolean;
    animationDirection: AnimationDirection;
    isLoading: boolean;
    isLastStep: boolean;
    isFirstStep: boolean;
    goToNextStep: () => void;
    localStorageKey: string;
    goToStep: (_stepName: MultiStepFormStepId) => void;
    goToPreviousStep: () => void;
    setFormStepData: <TField extends keyof MultiStepForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: MultiStepForm[TField]
    ) => void;
    setFormStepDataBatch: (_updates: Partial<MultiStepForm>) => void;
    cleanUp: () => void;
    /**
     * Used by vanity flows where we skip the last product-step but still need submission.
     * (Step #9 "No" => submitFinal)
     */
    submitFinal: (_finalActions: FinalActions, _finalDataOverride?: MultiStepForm) => Promise<void>;
    getOrderedProductSteps: (_formData: MultiStepForm) => PRODUCTS_TYPES[];
    handleProductStepSubmit: <T extends keyof ProductStepsData>(
        _stepId: T,
        _data: MultiStepForm[T],
        _actions: FinalActions
    ) => Promise<void>;
    currentProductInstanceIndex: number;
    goToProductInstance: <T extends keyof ProductStepsData>(_stepId: T, _index: number) => void;
};

export const LS_MULTI_STEP_FORM_KEY = 'HASTINGS_multi-step-form';

const PRODUCT_ENTRY_FIELD_MAP: Partial<Record<keyof ProductStepsData, keyof MultiStepForm>> = {
    vanities: 'vanitiesEntries',
    storage: 'storageEntries',
    countertops: 'countertopsEntries',
    mirror: 'mirrorEntries',
    pedestalAndConsoles: 'pedestalAndConsolesEntries',
    basin: 'basinEntries',
    tubs: 'tubsEntries',
    toilets: 'toiletsEntries',
};

const PRODUCT_STEP_IDS = new Set<keyof ProductStepsData>([
    'vanities',
    'storage',
    'countertops',
    'mirror',
    'pedestalAndConsoles',
    'basin',
    'tubs',
    'toilets',
]);

const MultiStepFormContext = React.createContext<MultiStepFormContextType>({} as MultiStepFormContextType);
MultiStepFormContext.displayName = 'MultiStepFormContext';

export type MultiStepFormProviderProps = React.PropsWithChildren<{
    /**
     * Allow vanity quiz to persist under its own localStorage key.
     */
    localStorageKey?: string;
    /**
     * Allow vanity quiz to enable/disable and re-label steps independently.
     */
    stepsConfig?: typeof MULTI_STEP_FORM_STEPS;
    /**
     * Allow vanity quiz to have its own result route.
     */
    resultPath?: string;
    /**
     * Allow vanity quiz to have its own default payload shape/values.
     */
    initialState?: MultiStepForm;
}>;

export const MultiStepFormProvider: React.FC<MultiStepFormProviderProps> = ({
    children,
    localStorageKey = LS_MULTI_STEP_FORM_KEY,
    stepsConfig = MULTI_STEP_FORM_STEPS,
    resultPath = '/result',
    initialState = MULTI_STEP_FORM_INITIAL_STATE,
}) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(localStorageKey, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(initialState)
                : (localStorage?.getItem(localStorageKey) ?? JSON.stringify(initialState)),
        initializeWithValue: false,
    });

    const [isLoading, toggleIsLoading] = useToggle(true);
    const [isInitialStepSet, toggleIsInitialStepSet] = useToggle();
    const [animationDirection, setAnimationDirection] = React.useState<AnimationDirection>('next');
    const [productStepInstanceIndex, setProductStepInstanceIndex] = React.useState<
        Partial<Record<keyof ProductStepsData, number>>
    >({});

    const stepsArray = React.useMemo(() => {
        return Object.values(stepsConfig).filter((step) => step.enabled);
    }, [stepsConfig]);

    const [
        currentStepIndex,
        {
            inc: incrementCurrentStepIndex,
            dec: decrementCurrentStepIndex,
            reset: resetCurrentStepIndex,
            set: setCurrentStepIndex,
        },
    ] = useCounter(0, stepsArray.length - 1, 0);

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return initialState;
        }

        return JSON.parse(formData) as MultiStepForm;
    }, [formData, initialState]);

    const currentStep = stepsArray[currentStepIndex];
    const getProductCountForStep = React.useCallback((stepId: MultiStepFormStepId, data: MultiStepForm) => {
        if (!PRODUCT_STEP_IDS.has(stepId as keyof ProductStepsData)) {
            return 1;
        }

        const productId = stepId as unknown as PRODUCTS_TYPES;
        return data.products.products.find((p) => p.id === productId)?.count ?? 1;
    }, []);
    const currentProductIndex = PRODUCT_STEP_IDS.has(currentStep.id as keyof ProductStepsData)
        ? (productStepInstanceIndex[currentStep.id as keyof ProductStepsData] ?? 0)
        : 0;
    const currentProductCount = getProductCountForStep(currentStep.id, parsedFormData);
    const isLastStep =
        currentStep.id === stepsArray[stepsArray.length - 1].id && currentProductIndex >= currentProductCount - 1;
    const isFirstStep = currentStep.id === stepsArray[0].id;
    const canGoBack = currentStepIndex > 0 || currentProductIndex > 0;

    const goToStep = React.useCallback(
        (stepName: MultiStepFormStepId) => {
            const targetStepIndex = stepsArray.findIndex((i) => i.id === stepName);
            if (targetStepIndex === -1) return;
            flushSync(() => {
                setAnimationDirection(currentStepIndex < targetStepIndex ? 'next' : 'prev');
            });

            setCurrentStepIndex(targetStepIndex);
            if (PRODUCT_STEP_IDS.has(stepName as keyof ProductStepsData)) {
                setProductStepInstanceIndex((prev) => ({
                    ...prev,
                    [stepName as keyof ProductStepsData]: 0,
                }));
            }
        },
        [currentStepIndex, stepsArray, setCurrentStepIndex]
    );

    const goToNextStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('next');
        });

        if (PRODUCT_STEP_IDS.has(currentStep.id as keyof ProductStepsData)) {
            const stepId = currentStep.id as keyof ProductStepsData;
            const currentIndex = productStepInstanceIndex[stepId] ?? 0;
            const count = getProductCountForStep(currentStep.id, parsedFormData);
            if (currentIndex < count - 1) {
                setProductStepInstanceIndex((prev) => ({
                    ...prev,
                    [stepId]: currentIndex + 1,
                }));
                return;
            }
        }

        incrementCurrentStepIndex();
    }, [currentStep.id, getProductCountForStep, incrementCurrentStepIndex, parsedFormData, productStepInstanceIndex]);

    const goToPreviousStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('prev');
        });

        if (PRODUCT_STEP_IDS.has(currentStep.id as keyof ProductStepsData)) {
            const stepId = currentStep.id as keyof ProductStepsData;
            const currentIndex = productStepInstanceIndex[stepId] ?? 0;
            if (currentIndex > 0) {
                setProductStepInstanceIndex((prev) => ({
                    ...prev,
                    [stepId]: currentIndex - 1,
                }));
                return;
            }
        }

        decrementCurrentStepIndex();
    }, [currentStep.id, decrementCurrentStepIndex, productStepInstanceIndex]);

    const setFormStepDataBatch = React.useCallback(
        (updates: Partial<MultiStepForm>) => {
            setFormData((prev) => {
                return JSON.stringify({
                    ...JSON.parse(prev ?? JSON.stringify(initialState)),
                    ...updates,
                });
            });
        },
        [setFormData, initialState]
    );
    const goToProductInstance = React.useCallback(
        <T extends keyof ProductStepsData>(stepId: T, index: number) => {
            const safeIndex = Math.max(0, index);
            const entryKey = PRODUCT_ENTRY_FIELD_MAP[stepId];
            const entries = entryKey ? parsedFormData[entryKey] : undefined;
            const defaultValue = initialState[stepId] as MultiStepForm[T];
            const nextValue =
                Array.isArray(entries) && entries[safeIndex]
                    ? (entries[safeIndex] as MultiStepForm[T])
                    : (defaultValue as MultiStepForm[T]);

            flushSync(() => {
                setAnimationDirection('next');
            });

            setFormStepDataBatch({
                [stepId]: nextValue,
            } as Partial<MultiStepForm>);
            setProductStepInstanceIndex((prev) => ({
                ...prev,
                [stepId]: safeIndex,
            }));
        },
        [initialState, parsedFormData, setFormStepDataBatch]
    );

    const setFormStepData = React.useCallback(
        <TField extends keyof MultiStepForm>(key: TField, data: MultiStepForm[TField]) => {
            setFormData((prev) => {
                if (!prev) {
                    return '';
                }

                return JSON.stringify({
                    ...JSON.parse(prev),
                    [key]: data,
                });
            });
        },
        [setFormData]
    );

    const cleanUp = React.useCallback(() => {
        resetCurrentStepIndex();
        setFormData(JSON.stringify(initialState));
    }, [resetCurrentStepIndex, setFormData]);

    const getOrderedProductSteps = React.useCallback((formData: MultiStepForm) => {
        const allSelected = formData.products.products.map((p) => p.id); // наприклад: ['vanities', 'mirror', 'toilets']
        const focusProduct = formData.productsFocus.product; // наприклад: 'mirror'

        // Ставимо фокусний продукт першим, інші — після нього
        const otherProducts = allSelected.filter((id) => id !== focusProduct);
        return [focusProduct, ...otherProducts];
    }, []);

    const runFinalSubmission = async (finalData: MultiStepForm, actions: FinalActions) => {
        try {
            actions.setShowOverlay(true);

            // 1. Збір метаданих файлів
            const selectedProductIds = finalData.products.products.map((p) => p.id);
            const filesMetadata = [
                ...(finalData.aboutProject?.files || []),
                ...selectedProductIds.flatMap((id) => {
                    const entryKey = `${id}Entries` as keyof MultiStepForm;
                    const entries = finalData[entryKey];
                    if (Array.isArray(entries)) {
                        return entries.flatMap((entry) => {
                            const files = (entry as StepWithFiles)?.files;
                            return Array.isArray(files) ? files : [];
                        });
                    }

                    const stepData = finalData[id as keyof MultiStepForm];
                    const files = (stepData as StepWithFiles)?.files;
                    return Array.isArray(files) ? files : [];
                }),
            ].filter((f) => f.idInIndexedDB);

            // 2. Отримання файлів з IndexedDB
            const filePromises = filesMetadata.map((f) => actions.get<File>('files', parseInt(f.idInIndexedDB!)));
            const results = await Promise.allSettled(filePromises);
            const successfulFiles = results
                .filter((r): r is PromiseFulfilledResult<File> => r.status === 'fulfilled')
                .map((r) => r.value);

            let attachments: FileUploadResult[] = [];

            // 3. Завантаження файлів
            if (successfulFiles.length > 0) {
                try {
                    const uploadResponse: FileUploadResponse = await actions.uploadFiles.mutateAsync(successfulFiles);
                    attachments = uploadResponse.results;
                } catch (error) {
                    console.error('File upload failed, but continuing...', error);
                }
            }

            // 4. Оновлення finalData з URL-ами завантажених файлів
            const updatedFinalData = { ...finalData };

            // Функція для маппінгу файлів з URL
            const mapFilesWithUrls = (files: FileMetadata[] | undefined): FileMetadata[] | undefined => {
                if (!files || files.length === 0) return files;

                return files.map((file) => {
                    const uploadedFile = attachments.find(
                        (uploaded) => uploaded.originalName === file.name && uploaded.size === file.size
                    );

                    return {
                        ...file,
                        url: uploadedFile?.url,
                    };
                });
            };

            // Оновлюємо aboutProject files
            if (updatedFinalData.aboutProject?.files) {
                updatedFinalData.aboutProject.files = mapFilesWithUrls(updatedFinalData.aboutProject.files);
            }

            // Оновлюємо files в кожному продукті
            selectedProductIds.forEach((id) => {
                const entryKey = `${id}Entries` as keyof MultiStepForm;
                const entries = updatedFinalData[entryKey];
                if (Array.isArray(entries)) {
                    (updatedFinalData as Record<string, unknown>)[entryKey] = entries.map((entry) => ({
                        ...(entry as object),
                        files: mapFilesWithUrls((entry as StepWithFiles).files),
                    }));
                } else {
                    const stepData = updatedFinalData[id as keyof MultiStepForm] as StepWithFiles;
                    if (stepData?.files) {
                        stepData.files = mapFilesWithUrls(stepData.files);
                    }
                }
            });

            // dual-shape v1: keep legacy singular fields from repeatable entries
            selectedProductIds.forEach((id) => {
                const entryKey = `${id}Entries` as keyof MultiStepForm;
                const entries = updatedFinalData[entryKey];
                if (Array.isArray(entries) && entries.length > 0) {
                    const legacyKey = id as unknown as keyof MultiStepForm;
                    (updatedFinalData as Record<string, unknown>)[legacyKey] = entries[0];
                }
            });

            // 5. Відправка імейлу з оновленими даними
            await actions.sendEmailMutation.mutateAsync({
                ...updatedFinalData,
                aesthetics: determineDominantStyles(updatedFinalData.roomStyle.rooms, SUBSTYLES),
                attachments: attachments,
            });

            console.log('FINAL_FORM_DATA', updatedFinalData);

            // 6. Оновлення контакту в HubSpot (ігноруємо помилку, якщо впаде)
            try {
                await actions.contactMutation.mutateAsync({
                    firstname: finalData.name.name + '_ELEMENTALS_TEST',
                    email: finalData.email.email,
                    questionnaire_app: JSON.stringify(updatedFinalData), // Відправляємо оновлені дані
                });
            } catch (hubspotError) {
                console.error(`HubSpot contact update failed, but it's not critical:`, hubspotError);
            }

            // 7. Очікування та навігація
            await new Promise((resolve) => setTimeout(resolve, 8500));

            actions.navigate({ to: resultPath as never });
        } catch (e) {
            console.error('Critical submission error:', e);
            actions.navigate({ to: resultPath as never });
        } finally {
            actions.setShowOverlay(false);
        }
    };

    const submitFinal = React.useCallback(
        async (finalActions: FinalActions, finalDataOverride?: MultiStepForm) => {
            await runFinalSubmission(finalDataOverride ?? parsedFormData, finalActions);
        },
        [parsedFormData, runFinalSubmission]
    );

    const handleProductStepSubmit = React.useCallback(
        async <T extends keyof ProductStepsData>(
            stepId: T,
            data: MultiStepForm[T],
            finalActions: FinalActions // Передаємо інструменти сюди
        ) => {
            const updatedFormData = { ...parsedFormData, [stepId]: data };
            const currentInstanceIndex = productStepInstanceIndex[stepId] ?? 0;
            const count = getProductCountForStep(stepId, updatedFormData);
            const entryKey = PRODUCT_ENTRY_FIELD_MAP[stepId];
            const entryUpdates = { [stepId]: data } as Partial<MultiStepForm>;

            if (entryKey) {
                const currentEntries = Array.isArray(updatedFormData[entryKey])
                    ? ([...updatedFormData[entryKey]] as MultiStepForm[T][])
                    : [];
                currentEntries[currentInstanceIndex] = data;
                (entryUpdates as Record<string, unknown>)[entryKey] = currentEntries;

                if (currentInstanceIndex < count - 1) {
                    const nextInstanceIndex = currentInstanceIndex + 1;
                    const nextValue = (currentEntries[nextInstanceIndex] ?? initialState[stepId]) as MultiStepForm[T];
                    setFormStepDataBatch({
                        ...entryUpdates,
                        [stepId]: nextValue,
                    });
                    setProductStepInstanceIndex((prev) => ({
                        ...prev,
                        [stepId]: nextInstanceIndex,
                    }));
                    return;
                }
            } else {
                setFormStepData(stepId, data);
            }

            setFormStepDataBatch(entryUpdates);
            setProductStepInstanceIndex((prev) => ({
                ...prev,
                [stepId]: 0,
            }));

            const productQueue = getOrderedProductSteps(updatedFormData);
            const currentIndex = productQueue.indexOf(stepId as unknown as PRODUCTS_TYPES);
            const nextProductId = productQueue[currentIndex + 1];

            if (nextProductId) {
                goToStep(nextProductId);
            } else {
                // Якщо це останній крок — запускаємо фінальну логіку
                await runFinalSubmission(updatedFormData, finalActions);
            }
        },
        [
            getOrderedProductSteps,
            getProductCountForStep,
            goToStep,
            initialState,
            parsedFormData,
            productStepInstanceIndex,
            setFormStepData,
            setFormStepDataBatch,
        ]
    );

    const memoizedValue = React.useMemo(() => {
        return {
            formData: parsedFormData,
            currentStepIndex,
            steps: stepsArray,
            currentStep,
            canGoBack,
            animationDirection,
            isLoading,
            isLastStep,
            isFirstStep,
            goToNextStep,
            goToStep,
            goToPreviousStep,
            setFormStepData,
            setFormStepDataBatch,
            cleanUp,
            getOrderedProductSteps,
            submitFinal,
            handleProductStepSubmit,
            localStorageKey,
            currentProductInstanceIndex: currentProductIndex,
            goToProductInstance,
        };
    }, [
        parsedFormData,
        currentStepIndex,
        currentStep,
        canGoBack,
        animationDirection,
        isLoading,
        isLastStep,
        isFirstStep,
        goToNextStep,
        goToStep,
        goToPreviousStep,
        setFormStepData,
        setFormStepDataBatch,
        cleanUp,
        getOrderedProductSteps,
        submitFinal,
        localStorageKey,
        handleProductStepSubmit,
        currentProductIndex,
        goToProductInstance,
        stepsArray,
    ]);

    React.useEffect(() => {
        if (formData && isInitialStepSet) {
            return;
        }

        toggleIsLoading(true);

        const lastCorrectStepIndex = stepsArray.findIndex((step) => {
            const result = step.schema.safeParse(parsedFormData[step.id]);

            return !result.success;
        });

        setCurrentStepIndex(lastCorrectStepIndex);

        if (formData) {
            toggleIsInitialStepSet(true);
            toggleIsLoading(false);
        }
    }, [
        formData,
        isInitialStepSet,
        parsedFormData,
        setCurrentStepIndex,
        stepsArray,
        toggleIsInitialStepSet,
        toggleIsLoading,
    ]);

    // useEffect(() => {
    //     cleanUp();
    // }, []);

    // useUnmountEffect(() => {
    //     cleanUp();
    // });

    return <MultiStepFormContext.Provider value={memoizedValue}>{children}</MultiStepFormContext.Provider>;
};

export const useMultiStepFormContext = () => {
    const context = useSafeContext(MultiStepFormContext);

    return context;
};

export const useMultiStepFormStepForm = <TStepId extends MultiStepFormStepId>(stepId: TStepId) => {
    const { formData, currentProductInstanceIndex } = useMultiStepFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const entryKey = `${String(stepId)}Entries` as keyof MultiStepForm;
    const entriesValue = formData[entryKey];
    const formDataValue =
        Array.isArray(entriesValue) && entriesValue.length > 0
            ? (entriesValue[currentProductInstanceIndex] ?? formData[stepId])
            : formData[stepId];

    const defaultValues = formDataValue;

    const form = useForm<MultiStepForm[TStepId]>({
        //@ts-expect-error strange type issue.
        resolver: zodResolver(MULTI_STEP_FORM_STEPS[stepId].schema as unknown as z.ZodType<MultiStepForm[TStepId]>),
        defaultValues: formDataValue as DefaultValues<MultiStepForm[TStepId]>,
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        form.reset(defaultValues as DefaultValues<MultiStepForm[TStepId]>);

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading, currentProductInstanceIndex]);

    return { form, isLoading };
};
