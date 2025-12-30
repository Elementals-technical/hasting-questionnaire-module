import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { StorageStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { CONCEPT_STYLE_STORAGE_TYPES, STORAGE_ARRANGEMENT_TYPES } from '../constants';

interface FilteredStorageOptions {
    conceptStyle: CardOption[];
    isSingleSelectMode: boolean;
    isOptionalField: (_field: keyof Pick<StorageStepdata, 'look' | 'additionalInfo' | 'color'>) => boolean;
}

/**
 * Storage Rulesets:
 *
 * Concept | Style:
 *   - This should be a multi-select by default
 *   - If "Single unit" in Storage Arrangement is selected:
 *     * Remove options: "Open-Closed", "Multi-Depth", "Clustered", "Multi-Level", "Staggered", "Geometric", "Creative"
 *     * Change to single-select (only one style can be selected)
 *
 * Optional Fields:
 *   - Users can proceed without making selections for: Look, Additional Info, Color
 */
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

    const isSingleUnit = storageArrangement === STORAGE_ARRANGEMENT_TYPES._SINGLE_UNIT;

    const filteredConceptStyle = useMemo(() => {
        if (!isSingleUnit) return allConceptStyleOptions;

        return allConceptStyleOptions.filter(
            (opt) => !excludedForSingleUnit.has(opt.id as CONCEPT_STYLE_STORAGE_TYPES)
        );
    }, [isSingleUnit, allConceptStyleOptions]);

    // --- AUTO RESET INVALID ITEMS & ENFORCE SINGLE SELECT ---
    useEffect(() => {
        const allowedIds = new Set(filteredConceptStyle.map((opt) => opt.id));
        const validSelected = selectedStyles.filter((id) => allowedIds.has(id));

        // Case 1: Single unit mode - enforce only one selection
        if (isSingleUnit && validSelected.length > 1) {
            // Keep only the first valid selection
            form.setValue('conceptStyle', [validSelected[0]] as CONCEPT_STYLE_STORAGE_TYPES[], {
                shouldValidate: true,
                shouldDirty: true,
            });
            return;
        }

        // Case 2: All selected styles were removed → choose fallback
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

        // Case 3: Some were removed → update list
        if (validSelected.length !== selectedStyles.length) {
            form.setValue('conceptStyle', validSelected as CONCEPT_STYLE_STORAGE_TYPES[], {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [selectedStyles, filteredConceptStyle, form, isSingleUnit]);

    // Optional fields
    const optionalFields: Array<keyof StorageStepdata> = ['look', 'additionalInfo', 'color'];

    const isOptionalField = (field: keyof Pick<StorageStepdata, 'look' | 'additionalInfo' | 'color'>) =>
        optionalFields.includes(field);

    return {
        conceptStyle: filteredConceptStyle,
        isSingleSelectMode: isSingleUnit,
        isOptionalField,
    };
};
