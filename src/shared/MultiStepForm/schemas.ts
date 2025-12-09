import * as z from 'zod';
import {
    CHALLENGES_OPTIONS_IDS,
    GOALS_OPTIONS_IDS,
    PROJECT_TYPE_OPTIONS_IDS,
} from '@/modules/Home/components/Questionnaire/steps/AboutProjectStep/constants';
import { PRODUCTS_TYPES } from '@/modules/Home/components/Questionnaire/steps/ProductsStep/constants';
import { BATHROOM_TYPES } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/constants';
import { STAGE_OPTIONS_IDS } from '@/modules/Home/components/Questionnaire/steps/StageStep/constants';
import {
    COLOR_TYPES,
    CONCEPT_STYLE_TYPES,
    LOOK_TYPES,
    MOUNTING_TYPE_TYPES,
    SINK_TYPE_TYPES,
    VANITIES_DEPTH_TYPES,
} from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/constants';

export const roomStyleStepSchema = z.object({
    rooms: z.array(z.string()).min(1, 'Choose at least one image'),
});

export const bathroomsStepSchema = z.object({
    rooms: z
        .array(
            z.object({
                id: z.enum(BATHROOM_TYPES),
                count: z.number().int().min(1, 'Count must be at least 1'),
            })
        )
        .min(1, 'Please select at least one room'),
});

export const bathroomsFocusStepSchema = z.object({
    rooms: z.array(z.enum(BATHROOM_TYPES)).min(1, 'Please select at least one bathroom'),
});

export const nameStepSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name should containt at least 3 characters' })
        .max(32, { message: 'Name is too long' }),
});

export const emailStepSchema = z.object({ email: z.string().email('Please enter a valid email') });

export const stageStepSchema = z.object({
    stage: z.enum(STAGE_OPTIONS_IDS, {
        message: 'Please select a stage',
    }),
});

export const projectGoalsStepSchema = z.object({
    projectType: z.enum(PROJECT_TYPE_OPTIONS_IDS as [string, ...string[]], {
        message: 'Please select a valid project type',
    }),
    goals: z.array(z.enum(GOALS_OPTIONS_IDS as [string, ...string[]])).min(1, 'Please select at least one goal'),
    challenges: z
        .array(z.enum(CHALLENGES_OPTIONS_IDS as [string, ...string[]]))
        .min(1, 'Please select at least one challenge'),
});

export const productsStepSchema = z.object({
    products: z
        .array(
            z.object({
                id: z.enum(PRODUCTS_TYPES),
                count: z.number().int().min(1, 'Count must be at least 1'),
            })
        )
        .min(1, 'Please select at least one product'),
});

export const productsFocusStepSchema = z.object({
    product: z.array(z.enum(PRODUCTS_TYPES)).min(1, 'Please select at least one product'),
});

export const vanitiesStepSchema = z.object({
    width: z
        .number()
        .min(24, { message: 'Value must be 24 or greater' })
        .max(114.2, { message: 'Value must be 114.2 or less' }),
    depth: z.enum(VANITIES_DEPTH_TYPES, {
        message: 'Please select a depth',
    }),
    mountingType: z
        .array(z.enum(MOUNTING_TYPE_TYPES as [string, ...string[]]))
        .min(1, 'Please select valid mounting type'),
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_TYPES, {
        message: 'Please select a mounting type',
    }),
    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),
    color: z
        .array(z.nativeEnum(COLOR_TYPES))
        .min(1, 'Please select at least one color')
        .max(Object.keys(COLOR_TYPES).length),
    look: z
        .array(z.nativeEnum(LOOK_TYPES))
        .min(1, 'Please select at least one color')
        .max(Object.keys(LOOK_TYPES).length),
});
