import DeckMountedIcon from '@/assets/icons/basin/DeckMountedIcon';
import WallMountedIcon from '@/assets/icons/basin/WallMountedIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const BASIN_WIDTH_LIMITS = {
    MIN: 14,
    MAX: 38,
};

export const BASIN_DEPTH_LIMITS = {
    MIN: 10,
    MAX: 20,
};

export const BASIN_HEIGHT_LIMITS = {
    MIN: 4,
    MAX: 11,
};

export const BASIN_OVERFLOW_TYPES = ['Yes'] as const;

export enum BASIN_MOUNTING_TYPES {
    _WALL_MOUNTED = 'wall-mounted',
    _DECK_MOUNTED = 'deck-mounted',
}

export const styleOptions: CardOption[] = [
    {
        id: BASIN_MOUNTING_TYPES._WALL_MOUNTED,
        label: 'Wall Mounted',
        icon: <WallMountedIcon />,
    },
    {
        id: BASIN_MOUNTING_TYPES._DECK_MOUNTED,
        label: 'Deck Mounted',
        icon: <DeckMountedIcon />,
    },
];
