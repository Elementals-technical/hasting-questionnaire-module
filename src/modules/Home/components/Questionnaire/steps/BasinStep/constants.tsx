import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const BASIN_OVERFLOW_TYPES = ['Yes'] as const;

export enum BASIN_MOUNTING_TYPES {
    _WALL_MOUNTED = 'wall-mounted',
    _DECK_MOUNTED = 'deck-mounted',
}

export const styleOptions: CardOption[] = [
    {
        id: BASIN_MOUNTING_TYPES._WALL_MOUNTED,
        label: 'Wall Mounted',
        icon: <VanitiesIcon />,
    },
    {
        id: BASIN_MOUNTING_TYPES._DECK_MOUNTED,
        label: 'Deck Mounted',
        icon: <VanitiesIcon />,
    },
];
