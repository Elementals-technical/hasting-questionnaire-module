import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export enum TUBS_SHAPE_TYPES {
    _RECTANGLE = 'rectangle',
    _OVAL = 'oval',
}

export const styleOptions: CardOption[] = [
    {
        id: TUBS_SHAPE_TYPES._RECTANGLE,
        label: 'Rectangle',
        icon: <VanitiesIcon />,
    },
    {
        id: TUBS_SHAPE_TYPES._OVAL,
        label: 'Oval',
        icon: <VanitiesIcon />,
    },
];
