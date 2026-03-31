import React from 'react';
import { MultiStepFormConfig } from './formEngineTypes';
import { MultiStepFormProvider, useMultiStepFormContext, useMultiStepFormStepForm } from './MultiStepFormContext';
import { FinalActions, MultiStepForm } from './types';

/**
 * Small factory to bind config to the shared provider.
 * It keeps the existing runtime stable while allowing per-flow presets.
 */
export const createMultiStepForm = <TForm extends MultiStepForm>(
    config: Omit<MultiStepFormConfig<TForm, FinalActions>, 'submitStrategy'>
) => {
    const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
        return (
            <MultiStepFormProvider
                localStorageKey={config.storageKey}
                // Shared provider currently uses static submit internals.
                resultPath={config.resultPath}
                stepsConfig={config.stepsConfig as MultiStepFormProviderProps['stepsConfig']}
                initialState={config.initialState}
            >
                {children}
            </MultiStepFormProvider>
        );
    };

    return {
        Provider,
        useFormContext: useMultiStepFormContext,
        useStepForm: useMultiStepFormStepForm,
    };
};

type MultiStepFormProviderProps = React.ComponentProps<typeof MultiStepFormProvider>;
