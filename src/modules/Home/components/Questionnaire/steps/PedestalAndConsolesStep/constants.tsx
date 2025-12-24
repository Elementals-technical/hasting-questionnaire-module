import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const PEDESTAL_AND_CONSOLES_WIDTH_LIMITS = {
    MIN: 10,
    MAX: 50,
};

export const PEDESTAL_AND_CONSOLES_DEPTH_LIMITS = {
    MIN: 5,
    MAX: 20,
};

export const PEDESTAL_AND_CONSOLES_SHAPE_TYPES = ['Rectangular', 'Round', 'Square', 'Teardrop', 'Oblong'] as const;
export const INTEGRATED_STORAGE_TYPES = ['Towel Bar/Rail/Hook', 'Integrated Shelving', 'Integrated Drawer '] as const;
export enum STYLE_TYPES {
    _PEDESTAL = 'pedestal',
    _CONSOLE = 'console',
}

export const styleOptions: CardOption[] = [
    {
        id: STYLE_TYPES._PEDESTAL,
        label: 'Pedestal',
        icon: <VanitiesIcon />,
    },
    {
        id: STYLE_TYPES._CONSOLE,
        label: 'Console',
        icon: <VanitiesIcon />,
    },
];
