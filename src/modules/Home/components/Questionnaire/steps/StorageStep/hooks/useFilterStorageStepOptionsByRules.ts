import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { StorageStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { CONCEPT_STYLE_STORAGE_TYPES, STORAGE_ARRANGEMENT_TYPES } from '../constants';

interface FilteredStorageOptions {
    conceptStyle: CardOption[];
    isOptionalField: (_fieldName: keyof Pick<StorageStepdata, 'look' | 'additionalInfo' | 'color'>) => boolean;
}

/**
 * Rules:
 * If storageArrangement = Single unit →
 * remove styles:
 *  - open-closed
 *  - multi-depth
 *  - clustered
 *  - multi-level
 *  - staggered
 *  - geometric
 *  - creative
 */
export const useFilterStorageStepOptionsByRules = (
    form: UseFormReturn<StorageStepdata>,
    allConceptStyleOptions: CardOption[]
): FilteredStorageOptions => {
    // Watch fields
    const storageArrangement = form.watch('storageArrangement');
    const selectedConceptStyle = form.watch('conceptStyle'); // single select (!) → schema is nativeEnum

    // Which styles to remove for "single unit"
    const excludedForSingleUnit = new Set<CONCEPT_STYLE_STORAGE_TYPES>([
        CONCEPT_STYLE_STORAGE_TYPES._OPEN_CLOSED,
        CONCEPT_STYLE_STORAGE_TYPES._MULTI_DEPTH,
        CONCEPT_STYLE_STORAGE_TYPES._CLUSTERED,
        CONCEPT_STYLE_STORAGE_TYPES._MULTI_LEVEL,
        CONCEPT_STYLE_STORAGE_TYPES._STAGGERED,
        CONCEPT_STYLE_STORAGE_TYPES._GEOMETRIC,
        CONCEPT_STYLE_STORAGE_TYPES._CREATIVE,
    ]);

    // Filter Concept Style options
    const filteredConceptStyle = useMemo(() => {
        const isSingleUnit = storageArrangement === STORAGE_ARRANGEMENT_TYPES._SINGLE_UNIT;

        if (!isSingleUnit) return allConceptStyleOptions;

        return allConceptStyleOptions.filter(
            (opt) => !excludedForSingleUnit.has(opt.id as CONCEPT_STYLE_STORAGE_TYPES)
        );
    }, [storageArrangement, allConceptStyleOptions]);

    // Auto-reset invalid conceptStyle selection
    useEffect(() => {
        if (!selectedConceptStyle) return;

        const isValid = filteredConceptStyle.some((opt) => opt.id === selectedConceptStyle);

        if (!isValid) {
            // Reset to undefined so user must re-select
            form.setValue('conceptStyle', '', {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    }, [selectedConceptStyle, filteredConceptStyle, form]);

    // Optional fields
    const optionalFields: Array<keyof StorageStepdata> = ['look', 'additionalInfo', 'color'];

    const isOptionalField = (fieldName: keyof Pick<StorageStepdata, 'look' | 'additionalInfo' | 'color'>) =>
        optionalFields.includes(fieldName);

    return {
        conceptStyle: filteredConceptStyle,
        isOptionalField,
    };
};
