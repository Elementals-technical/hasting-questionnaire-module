import FloorMountedIcon from '@/assets/icons/toilets/FloorMountedIcon';
import WallMountedIcon from '@/assets/icons/toilets/WallMountedIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const TOILETS_SOFT_CLOSE_SEAT_TYPES = ['Yes'] as const;

export enum TOILETS_MOUNTING_TYPES {
    _WALL_MOUNTED = 'wall-mounted',
    _FLOOR_MOUNTED = 'floor-mounted',
}

export const styleOptions: CardOption[] = [
    {
        id: TOILETS_MOUNTING_TYPES._WALL_MOUNTED,
        label: 'Wall Mounted',
        icon: <WallMountedIcon />,
    },
    {
        id: TOILETS_MOUNTING_TYPES._FLOOR_MOUNTED,
        label: 'Floor Mounted',
        icon: <FloorMountedIcon />,
    },
];
