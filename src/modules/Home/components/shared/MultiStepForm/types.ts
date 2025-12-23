import * as z from 'zod';
import {
    basinStepSchema,
    bathroomsFocusStepSchema,
    bathroomsStepSchema,
    countertopsStepSchema,
    emailStepSchema,
    mirrorsStepSchema,
    nameStepSchema,
    pedestalAndConsolesStepSchema,
    productsFocusStepSchema,
    productsStepSchema,
    projectGoalsStepSchema,
    roomStyleStepSchema,
    stageStepSchema,
    storageStepSchema,
    toiletsStepSchema,
    tubsStepSchema,
    vanitiesStepSchema,
} from './schemas';

export type AnimationDirection = 'next' | 'prev';

export type RoomStyleStepData = z.infer<typeof roomStyleStepSchema>;
export type BathroomsStepData = z.infer<typeof bathroomsStepSchema>;
export type BathroomsFocusStepData = z.infer<typeof bathroomsFocusStepSchema>;
export type NameStepData = z.infer<typeof nameStepSchema>;
export type EmailStepData = z.infer<typeof emailStepSchema>;
export type StageStepData = z.infer<typeof stageStepSchema>;
export type ProjectGoalsStepData = z.infer<typeof projectGoalsStepSchema>;
export type ProductsStepData = z.infer<typeof productsStepSchema>;
export type ProductsFocusStepData = z.infer<typeof productsFocusStepSchema>;
export type VanitiesStepData = z.infer<typeof vanitiesStepSchema>;
export type StorageStepdata = z.infer<typeof storageStepSchema>;
export type countertopsStepdata = z.infer<typeof countertopsStepSchema>;
export type mirrorsStepdata = z.infer<typeof mirrorsStepSchema>;
export type pedestalAndConsolesStepdata = z.infer<typeof pedestalAndConsolesStepSchema>;
export type basinStepdata = z.infer<typeof basinStepSchema>;
export type tubsStepdata = z.infer<typeof tubsStepSchema>;
export type toiletsStepdata = z.infer<typeof toiletsStepSchema>;
export type MultiStepForm = {
    roomStyle: RoomStyleStepData;
    bathrooms: BathroomsStepData;
    bathroomFocus: BathroomsFocusStepData;
    name: NameStepData;
    email: EmailStepData;
    stage: StageStepData;
    aboutProject: ProjectGoalsStepData;
    products: ProductsStepData;
    productsFocus: ProductsFocusStepData;
    //НИЖЧЕ ФОРМИ ЯКІ ЗАЛЕЖАТЬ ВІД ТОГО, ЩО БУЛО ОБРАНО НА productsFocus кроці
    vanities: VanitiesStepData;
    storage: StorageStepdata;
    countertops: countertopsStepdata;
    mirror: mirrorsStepdata;
    pedestalAndConsoles: pedestalAndConsolesStepdata;
    basin: basinStepdata;
    tubs: tubsStepdata;
    toilets: toiletsStepdata;
};

export type MultiStepFormStep = {
    id: keyof MultiStepForm;
    label: string;
    title: string;
    description?: string;
    schema: z.ZodSchema<MultiStepForm[keyof MultiStepForm]>;
    enabled?: boolean;
};
