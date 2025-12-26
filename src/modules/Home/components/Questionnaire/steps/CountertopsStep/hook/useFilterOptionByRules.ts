import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { countertopsStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { BASIN_QUANTITY_TYPES } from '../constants';

// Извлекаем тип элемента массива
type BasinQuantityType = (typeof BASIN_QUANTITY_TYPES)[number];

interface FilteredCountertopsOptions {
    basinQuantity: readonly BasinQuantityType[];
    isOptionalField: (
        _fieldName: keyof Pick<countertopsStepdata, 'depth' | 'topThickness' | 'look' | 'additionalInfo'>
    ) => boolean;
}

/**
 * Hook для фильтрации опций формы Countertops согласно бизнес-правилам
 * Автоматически сбрасывает невалидные значения в форме
 *
 * Countertop Rulesets:
 * 1. Basin Quantity: 2 → Not available for widths < 48"
 * 2. Optional fields: depth, topThickness, look, additionalInfo
 */
export const useFilterCountertopsOptionsByRules = (
    form: UseFormReturn<countertopsStepdata>,
    allBasinQuantityOptions: readonly BasinQuantityType[]
): FilteredCountertopsOptions => {
    // Получаем текущие значения формы
    const width = form.watch('width');
    const basinQuantity = form.watch('basinQuantity');

    // Rule 1: Width < 48" → Basin Quantity "2" не доступен
    const filteredBasinQuantity = useMemo((): readonly BasinQuantityType[] => {
        const currentWidth = width ?? 0;

        if (currentWidth < 48) {
            // Фильтруем опции, убирая "2"
            return allBasinQuantityOptions.filter((option) => option !== '2') as readonly BasinQuantityType[];
        }

        return allBasinQuantityOptions;
    }, [width, allBasinQuantityOptions]);

    // Автоматический сброс невалидных значений для basinQuantity
    useEffect(() => {
        if (basinQuantity) {
            const isQuantityValid = filteredBasinQuantity.includes(basinQuantity);

            if (!isQuantityValid) {
                // Сбрасываем значение, если оно больше не валидно
                form.setValue('basinQuantity', '' as typeof basinQuantity, {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
        }
    }, [basinQuantity, filteredBasinQuantity, form]);

    // Rule 2: Определяем, является ли поле опциональным
    const isOptionalField = (
        fieldName: keyof Pick<countertopsStepdata, 'depth' | 'topThickness' | 'look' | 'additionalInfo'>
    ): boolean => {
        const optionalFields: Array<keyof countertopsStepdata> = ['depth', 'topThickness', 'look', 'additionalInfo'];
        return optionalFields.includes(fieldName);
    };

    return {
        basinQuantity: filteredBasinQuantity,
        isOptionalField,
    };
};

/**
 * Утилитарная функция для проверки валидности выбора basin quantity
 */
export const isBasinQuantityValid = (
    selectedValue: string | undefined,
    availableOptions: readonly string[]
): boolean => {
    if (!selectedValue) return true;
    return availableOptions.includes(selectedValue);
};
