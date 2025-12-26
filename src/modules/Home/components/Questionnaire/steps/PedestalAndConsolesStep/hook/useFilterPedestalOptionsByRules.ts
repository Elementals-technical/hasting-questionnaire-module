import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { pedestalAndConsolesStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { INTEGRATED_STORAGE_TYPES, PEDESTAL_AND_CONSOLES_WIDTH_LIMITS, STYLE_TYPES } from '../constants';

type IntegratedStorageType = (typeof INTEGRATED_STORAGE_TYPES)[number];

interface WidthLimits {
    min: number;
    max: number;
}

interface FilteredPedestalOptions {
    widthLimits: WidthLimits;
    integratedStorage: readonly IntegratedStorageType[];
    isOptionalField: (
        _fieldName: keyof Pick<pedestalAndConsolesStepdata, 'shape' | 'integratedStorage' | 'additionalInfo'>
    ) => boolean;
}

/**
 * Hook для фильтрации опций формы Pedestal & Console согласно бизнес-правилам
 * Автоматически обновляет width при изменении стиля и сбрасывает невалидные значения
 *
 * Pedestal & Console Rulesets:
 * 1. Style = Pedestal → Max Width = 25" (обновление слайдера)
 * 2. Style = Pedestal → Integrated Storage: 'Integrated Drawer' недоступен
 * 3. Optional fields: shape, integratedStorage, additionalInfo
 */
export const useFilterPedestalOptionsByRules = (
    form: UseFormReturn<pedestalAndConsolesStepdata>,
    allIntegratedStorageOptions: typeof INTEGRATED_STORAGE_TYPES
): FilteredPedestalOptions => {
    // Получаем текущие значения формы
    const style = form.watch('style');
    const width = form.watch('width');
    const integratedStorage = form.watch('integratedStorage');

    // Rule 1: Style = Pedestal → Max Width = 25"
    const widthLimits = useMemo((): WidthLimits => {
        const isPedestal = style === STYLE_TYPES._PEDESTAL;

        if (isPedestal) {
            return {
                min: PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MIN,
                max: 25, // Ограничение для Pedestal
            };
        }

        return {
            min: PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MIN,
            max: PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MAX,
        };
    }, [style]);

    // Автоматическая корректировка width при изменении стиля
    useEffect(() => {
        const isPedestal = style === STYLE_TYPES._PEDESTAL;

        if (isPedestal && width > 25) {
            // Если ширина больше 25 и выбран Pedestal, сбрасываем до 25
            form.setValue('width', 25, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [style, width, form]);

    // Rule 2: Style = Pedestal → 'Integrated Drawer' недоступен
    const filteredIntegratedStorage = useMemo((): readonly IntegratedStorageType[] => {
        const isPedestal = style === STYLE_TYPES._PEDESTAL;

        if (isPedestal) {
            // Фильтруем 'Integrated Drawer '
            return allIntegratedStorageOptions.filter(
                (option) => option !== 'Integrated Drawer '
            ) as readonly IntegratedStorageType[];
        }

        return allIntegratedStorageOptions;
    }, [style, allIntegratedStorageOptions]);

    // Автоматический сброс 'Integrated Drawer' если выбран Pedestal
    useEffect(() => {
        const isPedestal = style === STYLE_TYPES._PEDESTAL;

        if (isPedestal && integratedStorage === 'Integrated Drawer ') {
            form.setValue('integratedStorage', undefined, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [style, integratedStorage, form]);

    // Rule 3: Определяем опциональные поля
    const isOptionalField = (
        fieldName: keyof Pick<pedestalAndConsolesStepdata, 'shape' | 'integratedStorage' | 'additionalInfo'>
    ): boolean => {
        const optionalFields: Array<keyof pedestalAndConsolesStepdata> = [
            'shape',
            'integratedStorage',
            'additionalInfo',
        ];
        return optionalFields.includes(fieldName);
    };

    return {
        widthLimits,
        integratedStorage: filteredIntegratedStorage,
        isOptionalField,
    };
};

/**
 * Утилитарная функция для проверки, является ли стиль Pedestal
 */
export const isPedestalStyle = (style: string | undefined): boolean => {
    return style === STYLE_TYPES._PEDESTAL;
};
