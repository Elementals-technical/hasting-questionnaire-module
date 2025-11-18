import * as z from 'zod';
import { cartStepSchema, configuratorStepSchema, planningStepSchema, vehiclesStepSchema } from './schemas';

export type AnimationDirection = 'next' | 'prev';

export type VehiclesStepSchema = z.infer<typeof vehiclesStepSchema>;
export type PlanningStepSchema = z.infer<typeof planningStepSchema>;
export type ConfiguratorStepSchema = z.infer<typeof configuratorStepSchema>;
export type CartStepSchema = z.infer<typeof cartStepSchema>;

export type MultiStepForm = {
    vehicles: VehiclesStepSchema;
    planning: PlanningStepSchema;
    configurator: ConfiguratorStepSchema;
    cart: CartStepSchema;
};

export type MultiStepFormStep = {
    id: keyof MultiStepForm;
    label: string;
    schema: z.ZodSchema<MultiStepForm[keyof MultiStepForm]>;
    enabled?: boolean;
};
