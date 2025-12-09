import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/shared/BathroomCard/types';

export const VANITIES_DEPTH_TYPES = ['14-15"', '18-19"', '19-21"'] as const;
export const MOUNTING_TYPE_TYPES = ['Wall', 'Floor'];

export enum CONCEPT_STYLE_TYPES {
    _SINGLE_VANITY = 'single-vanity',
    _DOUBLE_VANITY = 'double-vanity',
    _ONE_DRAWER = '1-drawer',
    _ONE_DRAWER_INNER = '1-drawer-inner',
    _TWO_DRAWER = '2-drawer',
    _OPEN_SHELVING = 'open-shelving',
    _MULTI_LEVEL = 'multi-level',
    _SLIM_PROFILE = 'slim-profile',
    _CURVED_VANITY = 'curved-vanity',
    _TANDEM_VANITIES = 'tandem-vanities',
}

export enum SINK_TYPE_TYPES {
    _INTEGRATED = 'integrated',
    _VESSEL = 'vessel',
    _UNDERMOUNT = 'undermount',
}

export enum COLOR_TYPES {
    _BEIGE = 'beige',
    _BLACK = 'black',
    _BLUE = 'blue',
    _BROWN = 'brown',
    _CREAM = 'cream',
    _GREEN = 'green',
    _ORANGE = 'orange',
    _PINK = 'pink',
    _RED = 'red',
    _WHITE = 'white',
    _YELLOW = 'yellow',
}

export enum LOOK_TYPES {
    _WOODLOOK = 'wood-look',
    _STONE_MARBLE_LOOK = 'stone-marble-look',
    _CEMENT_LOOK = 'cement-look',
    _METALLIC_LOOK = 'metallic',
}

export const mountingTypesOptions: CardOption[] = [
    {
        id: 'wall',
        label: 'Wall',
        icon: <VanitiesIcon />,
    },
    {
        id: 'floor',
        label: 'Floor',
        icon: <VanitiesIcon />,
    },
];
