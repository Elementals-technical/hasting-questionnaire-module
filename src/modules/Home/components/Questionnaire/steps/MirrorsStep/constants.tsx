import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const MIRROR_WIDTH_LIMITS = {
    MIN: 15,
    MAX: 90,
};

export const MIRROR_HEIGHT_LIMITS = {
    MIN: 15,
    MAX: 90,
};

export const MIRRORS_TYPES = ['Lit Mirror', 'Framed Mirror', 'Mirror Cabinet', 'Folding Mirror'] as const;

export const MIRRORS_DEFOGGER_TYPES = ['Yes'] as const;
export const MIRRORS_POWER_SENSOR_TYPES = ['Yes'] as const;
export const MIRRORS_DIMMABLE_TYPES = ['Yes'] as const;
export const MIRRORS_LIGHT_TEMPERATURE_TYPES = ['Warm', 'Neutral', 'Cool'] as const;
export const MIRRORS_BACKLIT_TYPES = ['Yes'] as const;
export const MIRRORS_MAGNIFYING_TYPES = ['Yes'] as const;

export enum SHAPE_MIRRORS_TYPES {
    _OVAL = 'oval',
    _RECTANGLE = 'rectangle',
    _ROUND = 'round',
    _SQUARE = 'square',
    _HEXAGONAL = 'hexagonal',
}

export const shapeMirrorsOptions: CardOption[] = [
    {
        id: SHAPE_MIRRORS_TYPES._OVAL,
        label: 'Oval',
        icon: <VanitiesIcon />,
    },
    {
        id: SHAPE_MIRRORS_TYPES._RECTANGLE,
        label: 'Rectangle',
        icon: <VanitiesIcon />,
    },
];
