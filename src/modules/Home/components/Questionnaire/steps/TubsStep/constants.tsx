import OvalIcon from '@/assets/icons/tubs/OvalIcon';
import RectangleIcon from '@/assets/icons/tubs/RectangleIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const TUBS_LENGTH_LIMITS = {
    MIN: 51,
    MAX: 67,
};

export const TUBS_WIDTH_LIMITS = {
    MIN: 24,
    MAX: 114.2,
};

export const TUBS_HEIGHT_LIMITS = {
    MIN: 19,
    MAX: 28,
};

export enum TUBS_SHAPE_TYPES {
    _RECTANGLE = 'rectangle',
    _OVAL = 'oval',
}

export const styleOptions: CardOption[] = [
    {
        id: TUBS_SHAPE_TYPES._RECTANGLE,
        label: 'Rectangle',
        icon: <RectangleIcon />,
    },
    {
        id: TUBS_SHAPE_TYPES._OVAL,
        label: 'Oval',
        icon: <OvalIcon />,
    },
];
