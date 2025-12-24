import HexagonalIcon from '@/assets/icons/mirrors/HexagonalIcon';
import OvalIcon from '@/assets/icons/mirrors/OvalIcon';
import RectangleIcon from '@/assets/icons/mirrors/RectangleIcon';
import RoundIcon from '@/assets/icons/mirrors/RoundIcon';
import SquareIcon from '@/assets/icons/mirrors/SquareIcon';
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
        icon: <OvalIcon />,
    },
    {
        id: SHAPE_MIRRORS_TYPES._RECTANGLE,
        label: 'Rectangle',
        icon: <RectangleIcon />,
    },
    {
        id: SHAPE_MIRRORS_TYPES._ROUND,
        label: 'Round',
        icon: <RoundIcon />,
    },
    {
        id: SHAPE_MIRRORS_TYPES._SQUARE,
        label: 'Square',
        icon: <SquareIcon />,
    },
    {
        id: SHAPE_MIRRORS_TYPES._HEXAGONAL,
        label: 'Hexagonal',
        icon: <HexagonalIcon />,
    },
];
