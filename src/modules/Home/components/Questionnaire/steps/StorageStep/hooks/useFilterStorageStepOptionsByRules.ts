import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { StorageStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { CONCEPT_STYLE_STORAGE_TYPES, STORAGE_ARRANGEMENT_TYPES } from '../constants';

interface FilteredStorageOptions {
    conceptStyle: CardOption[];
    isOptionalField: (_field: keyof Pick<StorageStepdata, 'look' | 'additionalInfo' | 'color'>) => boolean;
}

export const useFilterStorageStepOptionsByRules = (
    form: UseFormReturn<StorageStepdata>,
    allConceptStyleOptions: CardOption[]
): FilteredStorageOptions => {
    const storageArrangement = form.watch('storageArrangement');
    const selectedStyles = form.watch('conceptStyle') || [];

    const excludedForSingleUnit = new Set<CONCEPT_STYLE_STORAGE_TYPES>([
        CONCEPT_STYLE_STORAGE_TYPES._OPEN_CLOSED,
        CONCEPT_STYLE_STORAGE_TYPES._MULTI_DEPTH,
        CONCEPT_STYLE_STORAGE_TYPES._CLUSTERED,
        CONCEPT_STYLE_STORAGE_TYPES._MULTI_LEVEL,
        CONCEPT_STYLE_STORAGE_TYPES._STAGGERED,
        CONCEPT_STYLE_STORAGE_TYPES._GEOMETRIC,
        CONCEPT_STYLE_STORAGE_TYPES._CREATIVE,
    ]);

    const filteredConceptStyle = useMemo(() => {
        const isSingle = storageArrangement === STORAGE_ARRANGEMENT_TYPES._SINGLE_UNIT;

        if (!isSingle) return allConceptStyleOptions;

        return allConceptStyleOptions.filter(
            (opt) => !excludedForSingleUnit.has(opt.id as CONCEPT_STYLE_STORAGE_TYPES)
        );
    }, [storageArrangement, allConceptStyleOptions]);

    // --- AUTO RESET INVALID ITEMS ---
    useEffect(() => {
        const allowedIds = new Set(filteredConceptStyle.map((opt) => opt.id));

        const validSelected = selectedStyles.filter((id) => allowedIds.has(id));

        // Case: all selected styles were removed → choose fallback
        if (validSelected.length === 0) {
            const fallback = filteredConceptStyle[0];
            if (fallback) {
                form.setValue('conceptStyle', [fallback.id] as CONCEPT_STYLE_STORAGE_TYPES[], {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
            return;
        }

        // If some were removed → update list
        if (validSelected.length !== selectedStyles.length) {
            form.setValue('conceptStyle', validSelected as CONCEPT_STYLE_STORAGE_TYPES[], {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [selectedStyles, filteredConceptStyle, form]);

    // Optional fields
    const optionalFields: Array<keyof StorageStepdata> = ['look', 'additionalInfo', 'color'];

    const isOptionalField = (field: keyof Pick<StorageStepdata, 'look' | 'additionalInfo' | 'color'>) =>
        optionalFields.includes(field);

    return {
        conceptStyle: filteredConceptStyle,
        isOptionalField,
    };
};
