import {
    ADDITIONAL_INFO_FIELD_SCHEMA,
    COLOR_FIELD_SCHEMA,
    FILES_FIELD_SCHEMA,
    LOOK_FIELD_SCHEMA,
} from './schemas/fieldsShemas';
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
    CONCEPT_STYLE_VANITIES_TYPES,
    MOUNTING_TYPE_TYPES,
    VANITIES_DEPTH_TYPES,
} from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/constants';
import { COLOR_TYPES, LOOK_TYPES, SINK_TYPE_TYPES } from '../../Questionnaire/steps/constants';
import {
    BASIN_QUANTITY_TYPES,
    COUNTERTOPS_DEPTH_TYPES,
    STYLE_COUNTERTOPS_TYPES,
    TOP_THICKNESS_COUNTERTOPS_TYPES,
} from '../../Questionnaire/steps/CountertopsStep/constants';
import {
    CONCEPT_STYLE_STORAGE_TYPES,
    STORAGE_ARRANGEMENT_TYPES,
    STORAGE_DEPTH_TYPES,
} from '../../Questionnaire/steps/StorageStep/constants';

export const roomStyleStepSchema = z.object({
    rooms: z
        .array(
            z.object({
                img: z.string(),
                aesthetics: z.array(z.string()),
            })
        )
        .min(2, 'Choose at least two images'),
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
    rooms: z.enum(BATHROOM_TYPES, { message: 'Please select value' }),
});

export const nameStepSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name should containt at least 2 characters' })
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
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
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
    product: z.enum(PRODUCTS_TYPES, {
        message: 'Please select at least one focus product',
    }),
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
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
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
        .min(1, 'Please select at least one look')
        .max(Object.keys(LOOK_TYPES).length),
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const storageStepSchema = z.object({
    storageArrangement: z.nativeEnum(STORAGE_ARRANGEMENT_TYPES, {
        message: 'Please select a storage arrangement',
    }),
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_STORAGE_TYPES, {
        message: 'Please select a style type',
    }),
    height: z
        .number()
        .min(5, { message: 'Value must be 5 or greater' })
        .max(99, { message: 'Value must be 99 or less' }),

    width: z
        .number()
        .min(5, { message: 'Value must be 5 or greater' })
        .max(100, { message: 'Value must be 100 or less' }),
    depth: z.enum(STORAGE_DEPTH_TYPES, {
        message: 'Please select a depth',
    }),
    color: z
        .array(z.nativeEnum(COLOR_TYPES))
        .min(1, 'Please select at least one color')
        .max(Object.keys(COLOR_TYPES).length),
    look: z
        .array(z.nativeEnum(LOOK_TYPES))
        .min(1, 'Please select at least one look')
        .max(Object.keys(LOOK_TYPES).length),
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const countertopsStepSchema = z.object({
    style: z.nativeEnum(STYLE_COUNTERTOPS_TYPES, {
        message: 'Please select a style',
    }),
    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),

    width: z
        .number()
        .min(24, { message: 'Value must be 24 or greater' })
        .max(120, { message: 'Value must be 120 or less' }),
    depth: z.enum(COUNTERTOPS_DEPTH_TYPES, {
        message: 'Please select a depth',
    }),
    topThickness: z.nativeEnum(TOP_THICKNESS_COUNTERTOPS_TYPES, {
        message: 'Please select a depth',
    }),
    basinQuantity: z.enum(BASIN_QUANTITY_TYPES as [string, ...string[]], {
        message: 'Please select a depth',
    }),
    color: z
        .array(z.nativeEnum(COLOR_TYPES))
        .min(1, 'Please select at least one color')
        .max(Object.keys(COLOR_TYPES).length),
    look: z
        .array(z.nativeEnum(LOOK_TYPES))
        .min(1, 'Please select at least one color')
        .max(Object.keys(LOOK_TYPES).length),
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const mirrorsStepSchema = z.object({
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
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
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
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const pedestalAndConsolesStepSchema = z.object({
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
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
    }),
    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const basinStepSchema = z.object({
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
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
    }),
    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const tubsStepSchema = z.object({
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
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
    }),
    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const toiletsStepSchema = z.object({
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
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
    }),
    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});
