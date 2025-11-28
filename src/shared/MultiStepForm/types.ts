import * as z from 'zod';
import {
    bathroomsFocusStepSchema,
    bathroomsStepSchema,
    emailStepSchema,
    nameStepSchema,
    projectGoalsStepSchema,
    roomStyleStepSchema,
    stageStepSchema,
} from './schemas';

export type AnimationDirection = 'next' | 'prev';

export type RoomStyleStepData = z.infer<typeof roomStyleStepSchema>;
export type BathroomsStepData = z.infer<typeof bathroomsStepSchema>;
export type BathroomsFocusStepData = z.infer<typeof bathroomsFocusStepSchema>;
export type NameStepData = z.infer<typeof nameStepSchema>;
export type EmailStepData = z.infer<typeof emailStepSchema>;
export type StageStepData = z.infer<typeof stageStepSchema>;
export type ProjectGoalsStepData = z.infer<typeof projectGoalsStepSchema>;

export type MultiStepForm = {
    roomStyle: RoomStyleStepData;
    bathrooms: BathroomsStepData;
    bathroomFocus: BathroomsFocusStepData;
    name: NameStepData;
    email: EmailStepData;
    stage: StageStepData;
    aboutProject: ProjectGoalsStepData;
    // products:
    // productsFocus:
    // productsVanities
};

export type MultiStepFormStep = {
    id: keyof MultiStepForm;
    label: string;
    title: string;
    description?: string;
    schema: z.ZodSchema<MultiStepForm[keyof MultiStepForm]>;
    enabled?: boolean;
};
