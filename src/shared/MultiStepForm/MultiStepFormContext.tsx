import React, { useEffect } from 'react';
import { AnimationDirection, MultiStepForm, MultiStepFormStep } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { flushSync } from 'react-dom';
import { DefaultValues, Path, PathValue, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSafeContext } from '@/hooks/useSafeContext';
import {
    bathroomsFocusStepSchema,
    bathroomsStepSchema,
    emailStepSchema,
    nameStepSchema,
    roomStyleStepSchema,
} from './schemas';

type MultiStepFormContextType = {
    formData: MultiStepForm;
    steps: MultiStepFormStep[];
    currentStepIndex: number;
    currentStep: MultiStepFormStep;
    canGoBack: boolean;
    animationDirection: AnimationDirection;
    isLoading: boolean;
    isLastStep: boolean;
    goToNextStep: () => void;
    goToStep: (_stepIndex: number) => void;
    goToPreviousStep: () => void;
    setFormStepData: <TField extends keyof MultiStepForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: MultiStepForm[TField]
    ) => void;
};

export const LS_MULTI_STEP_FORM_KEY = 'HASTINGS_multi-step-form';

export const MULTI_STEP_FORM_STEPS = {
    roomStyle: {
        id: 'roomStyle',
        label: 'Room Style',
        title: 'Select the rooms that suit your style',
        description: 'Pick as many as you want',
        schema: roomStyleStepSchema,
        enabled: true,
    },
    bathrooms: {
        id: 'bathrooms',
        label: 'Bathrooms',
        title: 'Which rooms need a ‘little love’?',
        description: 'Select as many as you like',
        schema: bathroomsStepSchema,
        enabled: true,
    },
    bathroomFocus: {
        id: 'bathroomFocus',
        label: 'Bathroom Focus',
        title: 'Great! Which room should we focus on?',
        schema: bathroomsFocusStepSchema,
        enabled: true,
    },
    name: {
        id: 'name',
        label: 'Name',
        title: 'Let’s get to know each other',
        schema: nameStepSchema,
        enabled: true,
    },
    email: {
        id: 'email',
        label: 'Email',
        title: `Let's keep rollin!`,
        description: `Enter you email and let's get styling`,
        schema: emailStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof MultiStepForm, MultiStepFormStep>;
const MULTI_STEP_FORM_STEPS_ARRAY = Object.values(MULTI_STEP_FORM_STEPS).filter((step) => {
    return step.enabled;
});

const MULTI_STEP_FORM_INITIAL_STATE: MultiStepForm = {
    roomStyle: {
        rooms: [],
    },
    bathrooms: {
        rooms: [],
    },
    bathroomFocus: {
        rooms: [],
    },
    name: { name: '' },
    email: { email: '' },
};

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
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return MULTI_STEP_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as MultiStepForm;
    }, [formData]);

    const goToStep = React.useCallback(
        (stepIndex: number) => {
            flushSync(() => {
                setAnimationDirection(currentStepIndex < stepIndex ? 'next' : 'prev');
            });

            setCurrentStepIndex(stepIndex);
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
            goToNextStep,
            goToStep,
            goToPreviousStep,
            setFormStepData,
        };
    }, [
        parsedFormData,
        currentStepIndex,
        currentStep,
        canGoBack,
        animationDirection,
        isLoading,
        isLastStep,
        goToNextStep,
        goToStep,
        goToPreviousStep,
        setFormStepData,
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

    useEffect(() => {
        cleanUp();
    }, []);

    useUnmountEffect(() => {
        cleanUp();
    });

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
