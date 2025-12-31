import React from 'react';
import {
    AnimationDirection,
    FinalActions,
    MultiStepForm,
    MultiStepFormStep,
    ProductStepsData,
    StepWithFiles,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCounter, useLocalStorageValue, useToggle } from '@react-hookz/web';
import { flushSync } from 'react-dom';
import { DefaultValues, Path, PathValue, useForm } from 'react-hook-form';
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
    goToStep: (_stepName: keyof typeof MULTI_STEP_FORM_STEPS) => void;
    goToPreviousStep: () => void;
    setFormStepData: <TField extends keyof MultiStepForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: MultiStepForm[TField]
    ) => void;
    cleanUp: () => void;
    handleProductStepSubmit: <T extends keyof ProductStepsData>(
        _stepId: T,
        _data: MultiStepForm[T],
        _actions: FinalActions
    ) => Promise<void>;
};

export const LS_MULTI_STEP_FORM_KEY = 'HASTINGS_multi-step-form';

const MULTI_STEP_FORM_STEPS_ARRAY = Object.values(MULTI_STEP_FORM_STEPS).filter((step) => {
    return step.enabled;
});

const MultiStepFormContext = React.createContext<MultiStepFormContextType>({} as MultiStepFormContextType);
MultiStepFormContext.displayName = 'MultiStepFormContext';

export const MultiStepFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(LS_MULTI_STEP_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(MULTI_STEP_FORM_INITIAL_STATE)
                : (localStorage?.getItem(LS_MULTI_STEP_FORM_KEY) ?? JSON.stringify(MULTI_STEP_FORM_INITIAL_STATE)),
        initializeWithValue: false,
    });

    const [isLoading, toggleIsLoading] = useToggle(true);
    const [isInitialStepSet, toggleIsInitialStepSet] = useToggle();
    const [animationDirection, setAnimationDirection] = React.useState<AnimationDirection>('next');
    const [
        currentStepIndex,
        {
            inc: incrementCurrentStepIndex,
            dec: decrementCurrentStepIndex,
            reset: resetCurrentStepIndex,
            set: setCurrentStepIndex,
        },
    ] = useCounter(0, MULTI_STEP_FORM_STEPS_ARRAY.length - 1, 0);

    const currentStep = MULTI_STEP_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep = currentStep.id === MULTI_STEP_FORM_STEPS_ARRAY[MULTI_STEP_FORM_STEPS_ARRAY.length - 1].id;
    const isFirstStep = currentStep.id === MULTI_STEP_FORM_STEPS_ARRAY[0].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return MULTI_STEP_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as MultiStepForm;
    }, [formData]);

    const goToStep = React.useCallback(
        (stepName: keyof typeof MULTI_STEP_FORM_STEPS) => {
            const targetStepIndex = MULTI_STEP_FORM_STEPS_ARRAY.findIndex((i) => i.id === stepName) || -1;
            flushSync(() => {
                setAnimationDirection(currentStepIndex < targetStepIndex ? 'next' : 'prev');
            });

            setCurrentStepIndex(targetStepIndex);
        },
        [incrementCurrentStepIndex]
    );

    const goToNextStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('next');
        });

        incrementCurrentStepIndex();
    }, [incrementCurrentStepIndex]);

    const goToPreviousStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('prev');
        });

        decrementCurrentStepIndex();
    }, [decrementCurrentStepIndex]);

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
        setFormData(JSON.stringify(MULTI_STEP_FORM_INITIAL_STATE));
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

            // 4. Відправка імейлу (основна дія)
            await actions.sendEmailMutation.mutateAsync({
                ...finalData,
                aesthetics: determineDominantStyles(finalData.roomStyle.rooms, SUBSTYLES),
                attachments: attachments,
            });

            // 5. Оновлення контакту в HubSpot (ігноруємо помилку, якщо впаде)
            try {
                await actions.contactMutation.mutateAsync({
                    firstname: finalData.name.name + '_ELEMENTALS_TEST',
                    email: finalData.email.email,
                    questionnaire_app: JSON.stringify(finalData),
                });
            } catch (hubspotError) {
                console.error(`HubSpot contact update failed, but it's not critical:`, hubspotError);
            }

            // 6. Очікування та навігація
            // Використовуємо проміс замість setTimeout всередині try,
            // щоб finally не спрацював раніше часу
            await new Promise((resolve) => setTimeout(resolve, 8500));

            actions.navigate({ to: '/result' });
        } catch (e) {
            console.error('Critical submission error:', e);
            // Навіть при критичній помилці (наприклад, email впав), ведемо на сторінку результату
            actions.navigate({ to: '/result' });
        } finally {
            // Вимикаємо оверлей ТІЛЬКИ після завершення всіх очікувань або помилок
            actions.setShowOverlay(false);
        }
    };

    const handleProductStepSubmit = React.useCallback(
        async <T extends keyof ProductStepsData>(
            stepId: T,
            data: MultiStepForm[T],
            finalActions: FinalActions // Передаємо інструменти сюди
        ) => {
            setFormStepData(stepId, data);
            const updatedFormData = { ...parsedFormData, [stepId]: data };

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
        [parsedFormData, setFormStepData, goToStep]
    );

    const memoizedValue = React.useMemo(() => {
        return {
            formData: parsedFormData,
            currentStepIndex,
            steps: MULTI_STEP_FORM_STEPS_ARRAY,
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
            cleanUp,
            getOrderedProductSteps,
            handleProductStepSubmit,
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
        cleanUp,
        getOrderedProductSteps,
        handleProductStepSubmit,
    ]);

    React.useEffect(() => {
        if (formData && isInitialStepSet) {
            return;
        }

        toggleIsLoading(true);

        const lastCorrectStepIndex = MULTI_STEP_FORM_STEPS_ARRAY.findIndex((step) => {
            const result = step.schema.safeParse(parsedFormData[step.id]);

            return !result.success;
        });

        setCurrentStepIndex(lastCorrectStepIndex);

        if (formData) {
            toggleIsInitialStepSet(true);
            toggleIsLoading(false);
        }
    }, [formData, isInitialStepSet, parsedFormData, setCurrentStepIndex, toggleIsInitialStepSet, toggleIsLoading]);

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

export const useMultiStepFormStepForm = <TStepId extends keyof MultiStepForm>(stepId: TStepId) => {
    const { formData } = useMultiStepFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const formDataValue = formData[stepId];

    const defaultValues = typeof window === 'undefined' ? MULTI_STEP_FORM_INITIAL_STATE[stepId] : formDataValue;

    const form = useForm<MultiStepForm[TStepId]>({
        //@ts-expect-error strange type issue.
        resolver: zodResolver(MULTI_STEP_FORM_STEPS[stepId].schema as unknown as z.ZodType<MultiStepForm[TStepId]>),
        defaultValues: formDataValue as DefaultValues<MultiStepForm[TStepId]>,
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues).forEach((key) => {
            form.setValue(
                key as Path<MultiStepForm[TStepId]>,
                defaultValues[key as keyof MultiStepForm[TStepId]] as PathValue<
                    MultiStepForm[TStepId],
                    Path<MultiStepForm[TStepId]>
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
