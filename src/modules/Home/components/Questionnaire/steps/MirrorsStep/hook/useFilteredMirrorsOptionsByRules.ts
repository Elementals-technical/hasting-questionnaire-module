import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { mirrorsStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { MIRRORS_TYPES, SHAPE_MIRRORS_TYPES } from '../constants';

type MirrorType = (typeof MIRRORS_TYPES)[number];

interface FilteredMirrorsOptions {
    isSizeDisabled: boolean;
    sizeDisabledMessage: string | null;
    shouldShowColorField: boolean;
    shouldShowLookField: boolean;
    isOptionalField: (
        _fieldName: keyof Pick<
            mirrorsStepdata,
            'defogger' | 'powerSensor' | 'dimmable' | 'lightTemperature' | 'backlit' | 'magnifying' | 'additionalInfo'
        >
    ) => boolean;
}

/**
 * Hook для фильтрации опций формы Mirrors согласно бизнес-правилам
 *
 * Mirror Rulesets:
 * 1. Shape: Oval + Hexagonal shapes → Size selection disabled with notification
 * 2. Type: Multi-select field
 * 3. Color: Only display if Type includes 'Framed Mirror' or 'Mirror Cabinet'
 * 4. Look: Only display if Type includes 'Framed Mirror' or 'Mirror Cabinet'
 * 5. Optional fields: defogger, powerSensor, dimmable, lightTemperature, backlit, magnifying, additionalInfo
 */
export const useFilterMirrorsOptionsByRules = (form: UseFormReturn<mirrorsStepdata>): FilteredMirrorsOptions => {
    // Получаем текущие значения формы
    const shape = form.watch('shape');
    const type = form.watch('type');

    // Rule 1: Oval + Hexagonal shapes → disable Size with message
    const { isSizeDisabled, sizeDisabledMessage } = useMemo(() => {
        const restrictedShapes = [SHAPE_MIRRORS_TYPES._OVAL, SHAPE_MIRRORS_TYPES._HEXAGONAL];

        if (shape && restrictedShapes.includes(shape)) {
            const shapeName = shape.charAt(0).toUpperCase() + shape.slice(1);
            return {
                isSizeDisabled: true,
                sizeDisabledMessage: `${shapeName} mirrors are only available in select sizes`,
            };
        }

        return {
            isSizeDisabled: false,
            sizeDisabledMessage: null,
        };
    }, [shape]);

    // Rule 3 & 4: Show Color and Look only if Type includes 'Framed Mirror' or 'Mirror Cabinet'
    const { shouldShowColorField, shouldShowLookField } = useMemo(() => {
        const framedTypes: MirrorType[] = ['Framed Mirror', 'Mirror Cabinet'];

        // Проверяем, есть ли хотя бы один из нужных типов в выбранных
        const hasFramedType = type?.some((selectedType) => framedTypes.includes(selectedType as MirrorType)) ?? false;

        return {
            shouldShowColorField: hasFramedType,
            shouldShowLookField: hasFramedType,
        };
    }, [type]);

    // Rule 5: Определяем опциональные поля
    const isOptionalField = (
        fieldName: keyof Pick<
            mirrorsStepdata,
            'defogger' | 'powerSensor' | 'dimmable' | 'lightTemperature' | 'backlit' | 'magnifying' | 'additionalInfo'
        >
    ): boolean => {
        const optionalFields: Array<keyof mirrorsStepdata> = [
            'defogger',
            'powerSensor',
            'dimmable',
            'lightTemperature',
            'backlit',
            'magnifying',
            'additionalInfo',
        ];
        return optionalFields.includes(fieldName);
    };

    return {
        isSizeDisabled,
        sizeDisabledMessage,
        shouldShowColorField,
        shouldShowLookField,
        isOptionalField,
    };
};

/**
 * Утилитарная функция для проверки, является ли форма Framed
 */
export const hasFramedMirrorType = (types: string[] | undefined): boolean => {
    const framedTypes = ['Framed Mirror', 'Mirror Cabinet'];
    return types?.some((type) => framedTypes.includes(type)) ?? false;
};
