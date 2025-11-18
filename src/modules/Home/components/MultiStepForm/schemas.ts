import * as z from 'zod';

export const vehiclesStepSchema = z.object({
    preset: z.string(),
    car_brand: z.string(),
    car_model: z.string(),
    car_year: z.string(),
    trailerType: z.string(),
    traier_brand: z.string(),
    traier_model: z.string(),
    traier_year: z.string(),
    done: z.boolean().optional(),
});

export const planningStepSchema = z.object({
    planning: z.string(),
    done: z.boolean().optional(),
});

export const configuratorStepSchema = z.object({
    threekit_configuration: z.string(),
    done: z.boolean().optional(),
});

export const cartStepSchema = z.object({
    done: z.boolean().optional(),
});
