import { ReactNode } from 'react';
import { z } from 'zod';

export type StepDefinition<TForm extends Record<string, unknown>, TKey extends keyof TForm = keyof TForm> = {
    id: TKey;
    label: string;
    title: string;
    description?: ReactNode;
    schema: z.ZodSchema<TForm[TKey]>;
    enabled?: boolean;
};

export type StepInstance<TForm extends Record<string, unknown>> = {
    instanceId: string;
    stepKey: keyof TForm;
    instanceIndex: number;
};

export type SubmitStrategyArgs<TForm extends Record<string, unknown>, TFinalActions> = {
    finalData: TForm;
    actions: TFinalActions;
    resultPath: string;
};

export type SubmitStrategy<TForm extends Record<string, unknown>, TFinalActions> = (
    _args: SubmitStrategyArgs<TForm, TFinalActions>
) => Promise<void>;

export type MultiStepFormConfig<TForm extends Record<string, unknown>, TFinalActions> = {
    storageKey: string;
    initialState: TForm;
    stepsConfig: Record<keyof TForm, StepDefinition<TForm>>;
    resultPath: string;
    submitStrategy: SubmitStrategy<TForm, TFinalActions>;
};
