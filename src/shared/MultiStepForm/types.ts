import * as z from 'zod';
import {
    bathroomsFocusStepSchema,
    bathroomsStepSchema,
    emailStepSchema,
    nameStepSchema,
    roomStyleStepSchema,
} from './schemas';

export type AnimationDirection = 'next' | 'prev';

export type RoomStyleStepSchema = z.infer<typeof roomStyleStepSchema>;
export type BathroomsStepSchema = z.infer<typeof bathroomsStepSchema>;
export type BathroomsFocusStepSchema = z.infer<typeof bathroomsFocusStepSchema>;
export type NameStepSchema = z.infer<typeof nameStepSchema>;
export type EmailStepSchema = z.infer<typeof emailStepSchema>;

export type MultiStepForm = {
    roomStyle: RoomStyleStepSchema;
    bathrooms: BathroomsStepSchema;
    bathroomFocus: BathroomsFocusStepSchema;
    name: NameStepSchema;
    email: EmailStepSchema;
    // stage:
    // aboutProject
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
