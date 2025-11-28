import * as z from 'zod';
import {
    CHALLENGES_OPTIONS_IDS,
    GOALS_OPTIONS_IDS,
    PROJECT_TYPE_OPTIONS_IDS,
} from '@/modules/Home/components/Questionnaire/steps/AboutProjectStep/constants';
import { BATHROOM_SELECTABLE_IDS } from '@/modules/Home/components/Questionnaire/steps/BathroomFocusStep/constants';
import { BATHROOM_TYPES } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/constants';
import { STAGE_OPTIONS_IDS } from '@/modules/Home/components/Questionnaire/steps/StageStep/constants';

export const roomStyleStepSchema = z.object({
    rooms: z.array(z.string()),
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
    rooms: z.array(z.enum(BATHROOM_SELECTABLE_IDS)).min(1, 'Please select at least one bathroom'),
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
        required_error: 'Please select a stage',
        invalid_type_error: 'Please select a valid stage option',
    }),
});

export const projectGoalsStepSchema = z.object({
    projectType: z.enum(PROJECT_TYPE_OPTIONS_IDS as [string, ...string[]], {
        required_error: 'Please select a project type',
        invalid_type_error: 'Please select a valid project type',
    }),
    goals: z.array(z.enum(GOALS_OPTIONS_IDS as [string, ...string[]])).min(1, 'Please select at least one goal'),
    challenges: z
        .array(z.enum(CHALLENGES_OPTIONS_IDS as [string, ...string[]]))
        .min(1, 'Please select at least one challenge'),
});
