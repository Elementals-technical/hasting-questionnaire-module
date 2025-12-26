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
import { BATHROOM_TYPES } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/constants';
import { STAGE_OPTIONS_IDS } from '@/modules/Home/components/Questionnaire/steps/StageStep/constants';
import {
    CONCEPT_STYLE_VANITIES_TYPES,
    MOUNTING_TYPE_TYPES,
    NUMBER_OF_BASINS_VANITITES_TYPES,
    VANITIES_DEPTH_TYPES,
    VANITIES_WIDTH_LIMITS,
} from '@/modules/Home/components/Questionnaire/steps/VanitiesStep/constants';
import {
    BASIN_DEPTH_LIMITS,
    BASIN_HEIGHT_LIMITS,
    BASIN_MOUNTING_TYPES,
    BASIN_OVERFLOW_TYPES,
    BASIN_WIDTH_LIMITS,
} from '../../Questionnaire/steps/BasinStep/constants';
import { SINK_TYPE_TYPES } from '../../Questionnaire/steps/constants';
import {
    BASIN_QUANTITY_TYPES,
    COUNTERTOPS_DEPTH_TYPES,
    COUNTERTOPS_WIDTH_LIMITS,
    STYLE_COUNTERTOPS_TYPES,
    TOP_THICKNESS_COUNTERTOPS_TYPES,
} from '../../Questionnaire/steps/CountertopsStep/constants';
import {
    MIRROR_HEIGHT_LIMITS,
    MIRROR_WIDTH_LIMITS,
    MIRRORS_BACKLIT_TYPES,
    MIRRORS_DEFOGGER_TYPES,
    MIRRORS_DIMMABLE_TYPES,
    MIRRORS_LIGHT_TEMPERATURE_TYPES,
    MIRRORS_MAGNIFYING_TYPES,
    MIRRORS_POWER_SENSOR_TYPES,
    MIRRORS_TYPES,
    SHAPE_MIRRORS_TYPES,
} from '../../Questionnaire/steps/MirrorsStep/constants';
import {
    INTEGRATED_STORAGE_TYPES,
    PEDESTAL_AND_CONSOLES_DEPTH_LIMITS,
    PEDESTAL_AND_CONSOLES_SHAPE_TYPES,
    PEDESTAL_AND_CONSOLES_WIDTH_LIMITS,
    STYLE_TYPES,
} from '../../Questionnaire/steps/PedestalAndConsolesStep/constants';
import { PRODUCTS_TYPES } from '../../Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import {
    CONCEPT_STYLE_STORAGE_TYPES,
    STORAGE_ARRANGEMENT_TYPES,
    STORAGE_DEPTH_TYPES,
    STORAGE_HEIGHT_LIMITS,
    STORAGE_WIDTH_LIMITS,
} from '../../Questionnaire/steps/StorageStep/constants';
import { TOILETS_MOUNTING_TYPES, TOILETS_SOFT_CLOSE_SEAT_TYPES } from '../../Questionnaire/steps/ToiletsStep/constants';
import {
    TUBS_HEIGHT_LIMITS,
    TUBS_LENGTH_LIMITS,
    TUBS_SHAPE_TYPES,
    TUBS_WIDTH_LIMITS,
} from '../../Questionnaire/steps/TubsStep/constants';

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
                id: z.nativeEnum(PRODUCTS_TYPES),
                count: z.number().int().min(1, 'Count must be at least 1'),
            })
        )
        .min(1, 'Please select at least one product'),
});

export const productsFocusStepSchema = z.object({
    product: z.nativeEnum(PRODUCTS_TYPES, {
        message: 'Please select at least one focus product',
    }),
});

export const vanitiesStepSchema = z.object({
    width: z
        .number()
        .min(VANITIES_WIDTH_LIMITS.MIN, { message: `Value must be ${VANITIES_WIDTH_LIMITS.MIN} or greater` })
        .max(VANITIES_WIDTH_LIMITS.MAX, { message: `Value must be ${VANITIES_WIDTH_LIMITS.MAX} or less` }),
    depth: z.enum(VANITIES_DEPTH_TYPES, {
        message: 'Please select a depth',
    }),
    mountingType: z.array(z.enum(MOUNTING_TYPE_TYPES)).min(1, 'Please select valid mounting type'),
    numberOfBasins: z.nativeEnum(NUMBER_OF_BASINS_VANITITES_TYPES, {
        message: 'Please select a basin quantity',
    }),
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
    }),
    sinkType: z
        .nativeEnum(SINK_TYPE_TYPES, {
            message: 'Please select a sink type',
        })
        .optional(),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const storageStepSchema = z.object({
    storageArrangement: z.nativeEnum(STORAGE_ARRANGEMENT_TYPES, {
        message: 'Please select a storage arrangement',
    }),
    conceptStyle: z.array(z.nativeEnum(CONCEPT_STYLE_STORAGE_TYPES)).min(1, 'Please select at least one style type'),
    height: z
        .number()
        .min(STORAGE_HEIGHT_LIMITS.MIN, { message: `Value must be ${STORAGE_HEIGHT_LIMITS.MIN} or greater` })
        .max(STORAGE_HEIGHT_LIMITS.MAX, { message: `Value must be ${STORAGE_HEIGHT_LIMITS.MAX} or less` }),

    width: z
        .number()
        .min(STORAGE_WIDTH_LIMITS.MIN, { message: `Value must be ${STORAGE_WIDTH_LIMITS.MIN} or greater` })
        .max(STORAGE_WIDTH_LIMITS.MAX, { message: `Value must be ${STORAGE_WIDTH_LIMITS.MAX} or less` }),
    depth: z
        .enum(STORAGE_DEPTH_TYPES, {
            message: 'Please select a depth',
        })
        .optional(),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
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
        .min(COUNTERTOPS_WIDTH_LIMITS.MIN, { message: `Value must be ${COUNTERTOPS_WIDTH_LIMITS.MIN} or greater` })
        .max(COUNTERTOPS_WIDTH_LIMITS.MAX, { message: `Value must be ${COUNTERTOPS_WIDTH_LIMITS.MAX} or less` }),
    depth: z
        .enum(COUNTERTOPS_DEPTH_TYPES, {
            message: 'Please select a depth',
        })
        .optional(),
    topThickness: z
        .enum(TOP_THICKNESS_COUNTERTOPS_TYPES, {
            message: 'Please select a top thickness',
        })
        .optional(),
    basinQuantity: z.enum(BASIN_QUANTITY_TYPES, {
        message: 'Please select a quantity',
    }),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const mirrorsStepSchema = z.object({
    shape: z.nativeEnum(SHAPE_MIRRORS_TYPES, {
        message: 'Please select a mirror shape',
    }),
    width: z
        .number()
        .min(MIRROR_WIDTH_LIMITS.MIN, { message: `Value must be ${MIRROR_WIDTH_LIMITS.MIN} or greater` })
        .max(MIRROR_WIDTH_LIMITS.MAX, { message: `Value must be ${MIRROR_WIDTH_LIMITS.MAX} or less` }),
    height: z
        .number()
        .min(MIRROR_HEIGHT_LIMITS.MIN, { message: `Value must be ${MIRROR_HEIGHT_LIMITS.MIN} or greater` })
        .max(MIRROR_HEIGHT_LIMITS.MAX, { message: `Value must be ${MIRROR_HEIGHT_LIMITS.MAX} or less` }),
    type: z.array(z.enum(MIRRORS_TYPES)).min(1, 'Please select at least one mirror'),
    defogger: z
        .enum(MIRRORS_DEFOGGER_TYPES, {
            message: 'Please select a defogger',
        })
        .optional(),
    powerSensor: z
        .enum(MIRRORS_POWER_SENSOR_TYPES, {
            message: 'Please select a power sensor',
        })
        .optional(),
    dimmable: z
        .enum(MIRRORS_DIMMABLE_TYPES, {
            message: 'Please select a dimmable',
        })
        .optional(),
    lightTemperature: z
        .enum(MIRRORS_LIGHT_TEMPERATURE_TYPES, {
            message: 'Please select a light temperature option',
        })
        .optional(),
    backlit: z
        .enum(MIRRORS_BACKLIT_TYPES, {
            message: 'Please select a backlit',
        })
        .optional(),
    conceptStyle: z.nativeEnum(CONCEPT_STYLE_VANITIES_TYPES, {
        message: 'Please select a style type',
    }),
    magnifying: z
        .enum(MIRRORS_MAGNIFYING_TYPES, {
            message: 'Please select a magnifying',
        })
        .optional(),

    sinkType: z.nativeEnum(SINK_TYPE_TYPES, {
        message: 'Please select a sink type',
    }),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const pedestalAndConsolesStepSchema = z.object({
    style: z.nativeEnum(STYLE_TYPES, {
        message: 'Please select a style type',
    }),
    width: z
        .number()
        .min(PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MIN, {
            message: `Value must be ${PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MIN} or greater`,
        })
        .max(PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MAX, {
            message: `Value must be ${PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MAX} or less`,
        }),
    depth: z
        .number()
        .min(PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MIN, {
            message: `Value must be ${PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MIN} or greater`,
        })
        .max(PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MAX, {
            message: `Value must be ${PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MAX} or less`,
        })
        .optional(),
    shape: z
        .enum(PEDESTAL_AND_CONSOLES_SHAPE_TYPES, {
            message: 'Please select a integrated storage',
        })
        .optional(),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    integratedStorage: z
        .enum(INTEGRATED_STORAGE_TYPES, {
            message: 'Please select a integrated storage',
        })
        .optional(),
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const basinStepSchema = z.object({
    mountingType: z.nativeEnum(BASIN_MOUNTING_TYPES, {
        message: 'Please select a style type',
    }),
    width: z
        .number()
        .min(BASIN_WIDTH_LIMITS.MIN, { message: `Value must be ${BASIN_WIDTH_LIMITS.MIN} or greater` })
        .max(BASIN_WIDTH_LIMITS.MAX, { message: `Value must be ${BASIN_WIDTH_LIMITS.MAX} or less` }),
    depth: z
        .number()
        .min(BASIN_DEPTH_LIMITS.MIN, { message: `Value must be ${BASIN_DEPTH_LIMITS.MIN} or greater` })
        .max(BASIN_WIDTH_LIMITS.MAX, { message: `Value must be ${BASIN_DEPTH_LIMITS.MAX} or less` })
        .optional(),
    height: z
        .number()
        .min(BASIN_HEIGHT_LIMITS.MIN, { message: `Value must be${BASIN_HEIGHT_LIMITS.MIN} or greater` })
        .max(BASIN_WIDTH_LIMITS.MAX, { message: `Value must be ${BASIN_HEIGHT_LIMITS.MAX} or less` })
        .optional(),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    overflow: z
        .enum(BASIN_OVERFLOW_TYPES, {
            message: 'Please select a overflow',
        })
        .optional(),
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const tubsStepSchema = z.object({
    shape: z.nativeEnum(TUBS_SHAPE_TYPES, {
        message: 'Please select a shape type',
    }),
    length: z
        .number()
        .min(TUBS_LENGTH_LIMITS.MIN, { message: `Value must be ${TUBS_LENGTH_LIMITS.MIN} or greater` })
        .max(TUBS_LENGTH_LIMITS.MAX, { message: `Value must be ${TUBS_LENGTH_LIMITS.MAX} or less` }),
    width: z
        .number()
        .min(TUBS_WIDTH_LIMITS.MIN, { message: `Value must be ${TUBS_WIDTH_LIMITS.MIN} or greater` })
        .max(TUBS_WIDTH_LIMITS.MAX, { message: `Value must be ${TUBS_WIDTH_LIMITS.MAX}  or less` })
        .optional(),
    height: z
        .number()
        .min(TUBS_HEIGHT_LIMITS.MIN, { message: `Value must be  ${TUBS_HEIGHT_LIMITS.MIN} or greater` })
        .max(TUBS_HEIGHT_LIMITS.MAX, { message: `Value must be ${TUBS_HEIGHT_LIMITS.MAX}  or less` })
        .optional(),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});

export const toiletsStepSchema = z.object({
    mountingType: z.nativeEnum(TOILETS_MOUNTING_TYPES, {
        message: 'Please select a mounting type',
    }),
    softCloseSeat: z
        .enum(TOILETS_SOFT_CLOSE_SEAT_TYPES, {
            message: 'Please select a option',
        })
        .optional(),
    color: COLOR_FIELD_SCHEMA,
    look: LOOK_FIELD_SCHEMA,
    additionalInfo: ADDITIONAL_INFO_FIELD_SCHEMA,
    files: FILES_FIELD_SCHEMA,
});
