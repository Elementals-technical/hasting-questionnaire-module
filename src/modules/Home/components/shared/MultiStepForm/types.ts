import { ReactNode } from 'react';
import { useFileIndexedDBValue } from '@/lib/indexedDB/utils';
import { useNavigate } from '@tanstack/react-router';
import * as z from 'zod';
import { useCreateHubspotContact } from '@/hooks/useCreateHubspotContact';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useUploadFiles } from '@/hooks/useUploadFiles';
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

//Тип виключно кроків з продуктами
export type ProductStepsData = Pick<
    MultiStepForm,
    'vanities' | 'storage' | 'countertops' | 'mirror' | 'pedestalAndConsoles' | 'basin' | 'tubs' | 'toilets'
>;

// Ключі продуктів як окремий тип
export type ProductStepKey = keyof ProductStepsData;

//Назви продуктів з API Hastings
export const PRODUCT_DISPLAY_NAMES = [
    'Countertops',
    'Vanities',
    'Bathroom Accessories',
    'Storage & Shelving',
    'Mirrors',
    'Pedestals & Consoles',
    'Vessels',
    'Basins',
    'Tubs',
    'Toilets',
] as const;

export type ProductDisplayName = (typeof PRODUCT_DISPLAY_NAMES)[number];

// Маппінг між ключами форми та назвами для відображення
export const PRODUCT_STEP_TO_DISPLAY_NAME: Record<ProductStepKey, ProductDisplayName> = {
    countertops: 'Countertops',
    vanities: 'Vanities',
    storage: 'Storage & Shelving',
    mirror: 'Mirrors',
    pedestalAndConsoles: 'Pedestals & Consoles',
    basin: 'Basins',
    tubs: 'Tubs',
    toilets: 'Toilets',
};

export type MultiStepFormStep = {
    id: keyof MultiStepForm;
    label: string;
    title: string;
    description?: ReactNode;
    schema: z.ZodSchema<MultiStepForm[keyof MultiStepForm]>;
    enabled?: boolean;
};

// Тип для кроків, які можуть містити файли (на основі вашої схеми)
export type StepWithFiles = {
    files?: { idInIndexedDB?: string; name: string; size: number }[];
};

export type FinalActions = {
    setShowOverlay: (_value: boolean) => void;
    get: ReturnType<typeof useFileIndexedDBValue>['get'];
    contactMutation: ReturnType<typeof useCreateHubspotContact>;
    uploadFiles: ReturnType<typeof useUploadFiles>;
    sendEmailMutation: ReturnType<typeof useSendEmail>;
    navigate: ReturnType<typeof useNavigate>;
    cleanUp: () => void;
};
