import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { VanitiesStepData } from '@/modules/Home/components/shared/MultiStepForm/types';
import { CONCEPT_STYLE_VANITIES_TYPES, NUMBER_OF_BASINS_VANITITES_TYPES } from '../constants';

interface FilteredOptions {
    numberOfBasins: CardOption[];
    conceptStyle: CardOption[];
    isOptionalField: (_fieldName: keyof Pick<VanitiesStepData, 'sinkType' | 'look' | 'additionalInfo'>) => boolean;
}

/**
 * Hook для фильтрации опций формы Vanity согласно бизнес-правилам
 * Автоматически сбрасывает невалидные значения в форме
 *
 * Vanity Rulesets:
 * 1. Size (Width) < 48" → Basin Quantity of 2 is not available
 * 2. Mounting Type = Floor-mount → Concept/Style cannot be:
 *    - '1-Drawer w. Inner Drawer'
 *    - 'Slim Profile'
 *    - 'Curved Vanity'
 * 3. Optional fields: Sink Type, Look, 'What else should we know'
 */
export const useFilterVanitiesOptionsByRules = (
    form: UseFormReturn<VanitiesStepData>,
    allNumberOfBasinsOptions: CardOption[],
    allConceptStyleOptions: CardOption[]
): FilteredOptions => {
    // Получаем текущие значения формы
    const width = form.watch('width');
    const mountingType = form.watch('mountingType');
    const numberOfBasins = form.watch('numberOfBasins');
    const conceptStyle = form.watch('conceptStyle'); // Это МАССИВ теперь

    // Rule 1: Width < 48" → Double Basin не доступен
    const filteredNumberOfBasins = useMemo(() => {
        const currentWidth = width ?? 0;

        if (currentWidth < 48) {
            return allNumberOfBasinsOptions.filter(
                (option) => option.id !== NUMBER_OF_BASINS_VANITITES_TYPES._DOUBLE_VANITY
            );
        }

        return allNumberOfBasinsOptions;
    }, [width, allNumberOfBasinsOptions]);

    // Rule 2: Floor-mount → виключаємо певні Concept/Style
    const filteredConceptStyle = useMemo(() => {
        const currentMountingTypes = mountingType ?? [];
        const isFloorMount = currentMountingTypes.includes('floor');

        if (isFloorMount) {
            const excludedStyles = [
                CONCEPT_STYLE_VANITIES_TYPES._ONE_DRAWER_INNER,
                CONCEPT_STYLE_VANITIES_TYPES._SLIM_PROFILE,
                CONCEPT_STYLE_VANITIES_TYPES._CURVED_VANITY,
            ];

            return allConceptStyleOptions.filter(
                (option) => !excludedStyles.includes(option.id as CONCEPT_STYLE_VANITIES_TYPES)
            );
        }

        return allConceptStyleOptions;
    }, [mountingType, allConceptStyleOptions]);

    // Автоматический сброс невалидных значений для numberOfBasins
    useEffect(() => {
        if (numberOfBasins) {
            const isBasinsValid = filteredNumberOfBasins.some((option) => option.id === numberOfBasins);

            if (!isBasinsValid) {
                form.setValue('numberOfBasins', '' as unknown as NUMBER_OF_BASINS_VANITITES_TYPES, {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
        }
    }, [numberOfBasins, filteredNumberOfBasins, form]);

    // Автоматический сброс невалидных значений для conceptStyle
    useEffect(() => {
        const selectedStyles = conceptStyle || [];

        // Создаем Set из доступных ID
        const allowedIds = new Set(filteredConceptStyle.map((opt) => opt.id));

        // Фильтруем только валидные
        const validSelected = selectedStyles.filter((id) => allowedIds.has(id));

        // Если ВСЕ стили стали невалидными → выбираем первый доступный
        if (validSelected.length === 0 && selectedStyles.length > 0) {
            const fallback = filteredConceptStyle[0];
            if (fallback) {
                form.setValue('conceptStyle', [fallback.id] as CONCEPT_STYLE_VANITIES_TYPES[], {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
            return;
        }

        // Если некоторые были удалены → обновляем список
        if (validSelected.length !== selectedStyles.length) {
            form.setValue('conceptStyle', validSelected as CONCEPT_STYLE_VANITIES_TYPES[], {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [conceptStyle, filteredConceptStyle, form]);

    // Rule 3: Определяем, является ли поле опциональным
    const isOptionalField = (
        fieldName: keyof Pick<VanitiesStepData, 'sinkType' | 'look' | 'additionalInfo'>
    ): boolean => {
        const optionalFields: Array<keyof VanitiesStepData> = ['sinkType', 'look', 'additionalInfo'];
        return optionalFields.includes(fieldName);
    };

    return {
        numberOfBasins: filteredNumberOfBasins,
        conceptStyle: filteredConceptStyle,
        isOptionalField,
    };
};
