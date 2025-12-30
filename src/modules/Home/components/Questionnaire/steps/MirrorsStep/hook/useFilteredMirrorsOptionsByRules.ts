import { useCallback, useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { mirrorsStepdata } from '@/modules/Home/components/shared/MultiStepForm/types';
import { MIRROR_HEIGHT_LIMITS, MIRROR_WIDTH_LIMITS, MIRRORS_TYPES, SHAPE_MIRRORS_TYPES } from '../constants';

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
    shouldSyncDimensions: boolean;
    handleWidthChange: (_value: number) => void;
    handleHeightChange: (_value: number) => void;
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
 * 6. When a Round or Square mirror is selected, when a user drags the Width or Height slider bar,
 * both should move in unison + match
 */
export const useFilterMirrorsOptionsByRules = (form: UseFormReturn<mirrorsStepdata>): FilteredMirrorsOptions => {
    // Получаем текущие значения формы
    const shape = form.watch('shape');
    const type = form.watch('type');

    const width = form.watch('width');
    const height = form.watch('height');

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

    // Rule 6: Sync width and height for Round or Square mirror

    const shouldSyncDimensions = shape === SHAPE_MIRRORS_TYPES._ROUND || shape === SHAPE_MIRRORS_TYPES._SQUARE;

    // Синхронізація при зміні shape або активації shouldSyncDimensions
    useEffect(() => {
        if (shouldSyncDimensions && width !== undefined) {
            // Визначаємо нове значення для висоти, базуючись на ширині,
            // але не дозволяємо йому вийти за межі MIRROR_HEIGHT_LIMITS (20 - 60)
            const syncedHeight = Math.min(Math.max(width, MIRROR_HEIGHT_LIMITS.MIN), MIRROR_HEIGHT_LIMITS.MAX);

            // Оновлюємо, якщо поточна висота відрізняється від обчисленої синхронізованої
            if (height !== syncedHeight) {
                form.setValue('height', syncedHeight, { shouldValidate: true });
            }

            // Додатково: якщо ширина була, наприклад, 15 (мінімум для ширини),
            // а мінімум для висоти 20, то при синхронізації
            // ширина теж має стати 20, щоб вони відповідали один одному
            if (width < syncedHeight) {
                form.setValue('width', syncedHeight, { shouldValidate: true });
            }
        }
    }, [shouldSyncDimensions, shape, width, height, form]);

    const handleWidthChange = useCallback(
        (value: number) => {
            // Обмежуємо ширину її лімітами (15 - 90)
            const clampedWidth = Math.min(Math.max(value, MIRROR_WIDTH_LIMITS.MIN), MIRROR_WIDTH_LIMITS.MAX);
            form.setValue('width', clampedWidth, { shouldValidate: true });

            if (shouldSyncDimensions) {
                // Висота просто "наздоганяє" ширину, але не виходить за свої межі (20 - 60)
                const syncedHeight = Math.min(
                    Math.max(clampedWidth, MIRROR_HEIGHT_LIMITS.MIN),
                    MIRROR_HEIGHT_LIMITS.MAX
                );
                form.setValue('height', syncedHeight, { shouldValidate: true });
            }
        },
        [shouldSyncDimensions, form]
    );

    const handleHeightChange = useCallback(
        (value: number) => {
            // Обмежуємо висоту її лімітами (20 - 60)
            const clampedHeight = Math.min(Math.max(value, MIRROR_HEIGHT_LIMITS.MIN), MIRROR_HEIGHT_LIMITS.MAX);
            form.setValue('height', clampedHeight, { shouldValidate: true });

            if (shouldSyncDimensions) {
                // Ширина "наздоганяє" висоту в межах своїх лімітів (15 - 90)
                const syncedWidth = Math.min(Math.max(clampedHeight, MIRROR_WIDTH_LIMITS.MIN), MIRROR_WIDTH_LIMITS.MAX);
                form.setValue('width', syncedWidth, { shouldValidate: true });
            }
        },
        [shouldSyncDimensions, form]
    );

    return {
        isSizeDisabled,
        sizeDisabledMessage,
        shouldShowColorField,
        shouldShowLookField,
        isOptionalField,
        shouldSyncDimensions,
        handleWidthChange,
        handleHeightChange,
    };
};

/**
 * Утилитарная функция для проверки, является ли форма Framed
 */
export const hasFramedMirrorType = (types: string[] | undefined): boolean => {
    const framedTypes = ['Framed Mirror', 'Mirror Cabinet'];
    return types?.some((type) => framedTypes.includes(type)) ?? false;
};
