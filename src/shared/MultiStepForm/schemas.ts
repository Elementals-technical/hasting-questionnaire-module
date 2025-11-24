import * as z from 'zod';
import { BATHROOM_SELECTABLE_IDS } from '@/modules/Home/components/Questionnaire/steps/BathroomFocusStep/constants';
import { BATHROOM_TYPES } from '@/modules/Home/components/Questionnaire/steps/SelectBathroomsStep/constants';

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
    name: z.string().min(3).max(32),
});

export const emailStepSchema = z.object({ email: z.string().email('Invalid email address') });
