import { PRODUCTS_TYPES } from '@/modules/Home/components/Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';

const ENTRY_FIELD_BY_PRODUCT: Partial<Record<PRODUCTS_TYPES, keyof MultiStepForm>> = {
    [PRODUCTS_TYPES._VANITIES]: 'vanitiesEntries',
    [PRODUCTS_TYPES._STORAGE]: 'storageEntries',
    [PRODUCTS_TYPES._COUNTERTOPS]: 'countertopsEntries',
    [PRODUCTS_TYPES._MIRROR]: 'mirrorEntries',
    [PRODUCTS_TYPES._PEDESTALS_AND_CONSOLES]: 'pedestalAndConsolesEntries',
    [PRODUCTS_TYPES._BASIN]: 'basinEntries',
    [PRODUCTS_TYPES._TUBS]: 'tubsEntries',
    [PRODUCTS_TYPES._TOILETS]: 'toiletsEntries',
};

export const getEntryFieldByProduct = (productId: PRODUCTS_TYPES) => ENTRY_FIELD_BY_PRODUCT[productId];

/**
 * v1 dual-shape payload:
 * - keep legacy single product fields
 * - keep `*Entries[]` as canonical repeatable data.
 */
export const buildVanityDualShapePayload = (formData: MultiStepForm): MultiStepForm => {
    const payload: MultiStepForm = { ...formData };

    formData.products.products.forEach((product) => {
        const entryField = getEntryFieldByProduct(product.id);
        if (!entryField) {
            return;
        }

        const entries = payload[entryField];
        if (!Array.isArray(entries) || entries.length === 0) {
            return;
        }

        const firstEntry = entries[0];
        if (!firstEntry) {
            return;
        }

        const legacyField = product.id as unknown as keyof MultiStepForm;
        payload[legacyField] = firstEntry as MultiStepForm[keyof MultiStepForm];
    });

    return payload;
};
