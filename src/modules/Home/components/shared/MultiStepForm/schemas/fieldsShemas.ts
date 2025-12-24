import z from 'zod';
import { COLOR_TYPES, LOOK_TYPES } from '../../../Questionnaire/steps/constants';

export const FILES_FIELD_SCHEMA = z
    .array(
        z.object({
            idInIndexedDB: z.string().optional(),
            name: z.string(),
            size: z.number(),
        })
    )
    .optional();

export const ADDITIONAL_INFO_FIELD_SCHEMA = z.string().optional();

export const COLOR_FIELD_SCHEMA = z
    .array(z.nativeEnum(COLOR_TYPES))
    .min(1, 'Please select at least one color')
    .max(Object.keys(COLOR_TYPES).length);

export const LOOK_FIELD_SCHEMA = z
    .array(z.nativeEnum(LOOK_TYPES))
    .min(1, 'Please select at least one color')
    .max(Object.keys(LOOK_TYPES).length)
    .optional();
