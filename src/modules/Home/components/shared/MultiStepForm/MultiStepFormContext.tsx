import React from 'react';
import { AnimationDirection, FinalActions, MultiStepForm, MultiStepFormStep, StepWithFiles } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCounter, useLocalStorageValue, useToggle } from '@react-hookz/web';
import { flushSync } from 'react-dom';
import { DefaultValues, Path, PathValue, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSafeContext } from '@/hooks/useSafeContext';
import {
    CONCEPT_STYLE_VANITIES_TYPES,
    NUMBER_OF_BASINS_VANITITES_TYPES,
} from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/constants';
import { SUBSTYLES } from '@/modules/Result/components/BonusSuggestions/constants';
import { determineDominantStyles } from '@/modules/Result/components/BonusSuggestions/utils';
import { FileUploadResponse, FileUploadResult } from '@/api/hubspot/api';
import { BASIN_MOUNTING_TYPES } from '../../Questionnaire/steps/BasinStep/constants';
import { SINK_TYPE_TYPES } from '../../Questionnaire/steps/constants';
import {
    STYLE_COUNTERTOPS_TYPES,
    TOP_THICKNESS_COUNTERTOPS_TYPES,
} from '../../Questionnaire/steps/CountertopsStep/constants';
import { SHAPE_MIRRORS_TYPES } from '../../Questionnaire/steps/MirrorsStep/constants';
import { STYLE_TYPES } from '../../Questionnaire/steps/PedestalAndConsolesStep/constants';
import { PRODUCTS_TYPES } from '../../Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import {
    CONCEPT_STYLE_STORAGE_TYPES,
    STORAGE_ARRANGEMENT_TYPES,
} from '../../Questionnaire/steps/StorageStep/constants';
import { TOILETS_MOUNTING_TYPES } from '../../Questionnaire/steps/ToiletsStep/constants';
import { TUBS_SHAPE_TYPES } from '../../Questionnaire/steps/TubsStep/constants';
import {
    basinStepSchema,
    bathroomsFocusStepSchema,
    bathroomsStepSchema,
    countertopsStepSchema,
    emailStepSchema,
    mirrorsStepSchema,
    nameStepSchema,
    pedestalAndConsolesStepSchema,
    productsFocusStepSchema,
    productsStepSchema,
    projectGoalsStepSchema,
    roomStyleStepSchema,
    stageStepSchema,
    storageStepSchema,
    toiletsStepSchema,
    tubsStepSchema,
    vanitiesStepSchema,
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
    handleProductStepSubmit: <T extends keyof MultiStepForm>(
        _stepId: T,
        _data: MultiStepForm[T],
        _actions: FinalActions
    ) => Promise<void>;
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
        description: 'Select one room to get started',
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
    stage: {
        id: 'stage',
        label: 'Stage',
        title: `What best describes the current stage of your project?`,
        schema: stageStepSchema,
        enabled: true,
    },
    aboutProject: {
        id: 'aboutProject',
        label: 'About Project',
        title: 'Let’s get to know your project a bit',
        description: 'Give us the lowdown',
        schema: projectGoalsStepSchema,
        enabled: true,
    },
    products: {
        id: 'products',
        label: 'Products',
        title: 'Which solutions are you in need of?',
        description: 'Select as many as you need',
        schema: productsStepSchema,
        enabled: true,
    },
    productsFocus: {
        id: 'productsFocus',
        label: 'Products Focus',
        title: 'Great! Which solution should we focus on first?',
        description: 'Select a product to start',
        schema: productsFocusStepSchema,
        enabled: true,
    },
    vanities: {
        id: 'vanities',
        label: 'Vanities',
        title: 'Let’s get to know your vanity musts',
        description: 'Don’t feel compelled to answer everything. Thats why we’re here!',
        schema: vanitiesStepSchema,
        enabled: true,
    },
    storage: {
        id: 'storage',
        label: 'Storage',
        title: 'Let’s get to know your storage must-haves',
        description: 'Don’t feel compelled to answer everything. Thats why we’re here!',
        schema: storageStepSchema,
        enabled: true,
    },
    countertops: {
        id: 'countertops',
        label: 'Countertops',
        title: 'Gives us the lowdown on your countertop needs',
        description: `Don't feel compelled to answer everything. Thats why we're here!`,
        schema: countertopsStepSchema,
        enabled: true,
    },
    mirror: {
        id: 'mirror',
        label: 'Mirror',
        title: `Let's get to know your mirror must-haves`,
        description: `Don't feel compelled to answer everything. Thats why we're here!`,
        schema: mirrorsStepSchema,
        enabled: true,
    },
    pedestalAndConsoles: {
        id: 'pedestalAndConsoles',
        label: 'Pedestan and Consoles',
        title: `Let's get to know your console must-haves`,
        description: `Don't feel compelled to answer everything. Thats why we're here!`,
        schema: pedestalAndConsolesStepSchema,
        enabled: true,
    },
    basin: {
        id: 'basin',
        label: 'Basin',
        title: `Let's get to know your basin must-haves`,
        description: `Don't feel compelled to answer everything. Thats why we're here!`,
        schema: basinStepSchema,
        enabled: true,
    },
    tubs: {
        id: 'tubs',
        label: 'Tubs',
        title: `Let's get to know your tubs must-haves`,
        description: `Don't feel compelled to answer everything. Thats why we're here!`,
        schema: tubsStepSchema,
        enabled: true,
    },
    toilets: {
        id: 'toilets',
        label: 'Toilets',
        title: `Let's get to know your toilets must-haves`,
        description: `Don't feel compelled to answer everything. Thats why we're here!`,
        schema: toiletsStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof MultiStepForm, MultiStepFormStep>;
const MULTI_STEP_FORM_STEPS_ARRAY = Object.values(MULTI_STEP_FORM_STEPS).filter((step) => {
    return step.enabled;
});

export const MULTI_STEP_FORM_INITIAL_STATE: MultiStepForm = {
    roomStyle: {
        rooms: [],
    },
    bathrooms: {
        rooms: [],
    },
    bathroomFocus: {
        rooms: 'accessibleBath',
    },
    name: { name: '' },
    email: { email: '' },
    stage: { stage: '' },
    aboutProject: { projectType: '', goals: [], challenges: [] },
    products: { products: [] },
    productsFocus: { product: PRODUCTS_TYPES._MIRROR },
    vanities: {
        width: 24,
        depth: '14-15"',
        color: [],
        mountingType: 'wall',
        sinkType: SINK_TYPE_TYPES._INTEGRATED,
        conceptStyle: CONCEPT_STYLE_VANITIES_TYPES._CURVED_VANITY,
        look: [],
        numberOfBasins: NUMBER_OF_BASINS_VANITITES_TYPES._SINGLE_VANITY,
    },
    storage: {
        width: 5,
        depth: '5-9.9"',
        conceptStyle: [CONCEPT_STYLE_STORAGE_TYPES._CLOSED_STORAGE_COLUMN],
        color: [],
        look: [],
        storageArrangement: STORAGE_ARRANGEMENT_TYPES._SINGLE_UNIT,
        height: 0,
    },
    countertops: {
        style: STYLE_COUNTERTOPS_TYPES._FLOATING,
        sinkType: SINK_TYPE_TYPES._INTEGRATED,
        width: 29,
        depth: '14-15"',
        topThickness: TOP_THICKNESS_COUNTERTOPS_TYPES[0],
        basinQuantity: '1',
        color: [],
        look: [],
    },
    mirror: {
        shape: SHAPE_MIRRORS_TYPES._OVAL,
        type: ['Lit Mirror'],
        width: 15,
        height: 20,
        conceptStyle: CONCEPT_STYLE_VANITIES_TYPES._MULTI_LEVEL,
        sinkType: SINK_TYPE_TYPES._INTEGRATED,
        color: [],
        look: [],
    },
    pedestalAndConsoles: {
        width: 24,
        depth: 24,
        color: [],
        look: [],
        style: STYLE_TYPES._PEDESTAL,
    },
    basin: {
        width: 14,
        depth: 10,
        mountingType: BASIN_MOUNTING_TYPES._WALL_MOUNTED,
        color: [],
        look: [],
        height: 4,
    },
    tubs: {
        width: 24,
        color: [],
        look: [],
        height: 19,
        shape: TUBS_SHAPE_TYPES._RECTANGLE,
        length: 51,
    },
    toilets: {
        color: [],
        look: [],
        mountingType: TOILETS_MOUNTING_TYPES._WALL_MOUNTED,
    },
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

            const selectedProductIds = finalData.products.products.map((p) => p.id);
            const filesMetadata = [
                ...(finalData.aboutProject?.files || []),
                ...selectedProductIds.flatMap((id) => {
                    // Отримуємо дані конкретного кроку
                    const stepData = finalData[id as keyof MultiStepForm];

                    // Використовуємо твій тип StepWithFiles для перевірки
                    const files = (stepData as StepWithFiles)?.files;

                    // Якщо файли є і це масив — повертаємо його, інакше порожній масив
                    return Array.isArray(files) ? files : [];
                }),
            ].filter((f) => f.idInIndexedDB);

            // Робота з IndexedDB
            const filePromises = filesMetadata.map((f) => actions.get<File>('files', parseInt(f.idInIndexedDB!)));
            const results = await Promise.allSettled(filePromises);
            const successfulFiles = results
                .filter((r): r is PromiseFulfilledResult<File> => r.status === 'fulfilled')
                .map((r) => r.value);

            // Мутації
            await actions.contactMutation.mutateAsync({
                firstname: finalData.name.name + '_ELEMENTALS_TEST',
                email: finalData.email.email,
                questionnaire_app: JSON.stringify(finalData),
            });

            let attachments: FileUploadResult[] = [];

            if (successfulFiles.length > 0) {
                // Вказуємо тип для відповіді мутації
                const uploadResponse: FileUploadResponse = await actions.uploadFiles.mutateAsync(successfulFiles);
                attachments = uploadResponse.results;
            }

            // 3. Відправляємо імейл
            await actions.sendEmailMutation.mutateAsync({
                ...finalData,
                aesthetics: determineDominantStyles(finalData.roomStyle.rooms, SUBSTYLES),
                attachments: attachments, // Тепер типи збігаються (FileUploadResult[])
            });

            setTimeout(() => {
                actions.navigate({ to: '/result' });
            }, 5500);
        } catch (e) {
            console.error(e);
        } finally {
            actions.navigate({ to: '/result' });
            actions.setShowOverlay(false);
        }
    };

    const handleProductStepSubmit = React.useCallback(
        async <T extends keyof MultiStepForm>(
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
