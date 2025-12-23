import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import CurvedVanityIcon from '@/assets/icons/vanities/CurvedVanityIcon';
import DoubleVanityIcon from '@/assets/icons/vanities/DoubleVanityIcon';
import MultiLevelIcon from '@/assets/icons/vanities/MultiLevelIcon';
import OneDrawerInnerIcon from '@/assets/icons/vanities/OnerDrawerInnerIcon';
import OpenShelvingIcon from '@/assets/icons/vanities/OpenShelvingIcon';
import SingleVanityIcon from '@/assets/icons/vanities/SingleVanityIcon';
import SlimProfileIcon from '@/assets/icons/vanities/SlimProfileIcon';
import TandemVanitiesIcon from '@/assets/icons/vanities/TandemVanitiesIcon';
import TwoDrawerIcon from '@/assets/icons/vanities/TwoDrawerIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { TagOption } from '@/modules/Home/components/shared/TagSelector/types';
import { SINK_TYPE_TYPES } from '../constants';

export const STORAGE_HEIGHT_LIMITS = {
    MIN: 5,
    MAX: 99,
};

export const STORAGE_WIDTH_LIMITS = {
    MIN: 5,
    MAX: 100,
};

export const STORAGE_DEPTH_TYPES = ['5-9.9"', '10-15.9" ', '16-20.9"'] as const;

export enum STORAGE_ARRANGEMENT_TYPES {
    _SINGLE_UNIT = 'single-unit',
    _MULTI_UNIT = 'multi-unit',
    _NOT_SURE = 'not-sure',
}

export enum CONCEPT_STYLE_STORAGE_TYPES {
    _CLOSED_STORAGE_COLUMN = 'closed-storage-column',
    _OPEN_STORAGE_COLUMN = 'open-storage-column',
    _FLOATING_SHELVING = 'floating-shelving',
    _SEMI_CANCELED_STORAGE = 'semi-canceled-storage',
    _CUBBY_STORAGE = 'cubby-storage',
    _LADDER_STORAGE = 'ladder-storage',
    _HORIZONTAL_STORAGE = 'horizontal-storage',
    _NOOK_STORAGE = 'nook-storage',
    _FOLD_UP_DOWN_STORAGE = 'foold-up-down-storage',
    _CORNER_STORAGE = 'corner-storage',
    _MIRRORED_STORAGE = 'mirrored-storage',
    _ROTATING_REVOLVED_STORAGE = 'rotating-revolved-storage',
    _RECESSED_STORAGE = 'recessed-storage',
    _LIGHTED_STORAGE = 'lighted-storage',
    _FLOOR_MOUNT_STORAGE = 'floor-mount-storage',
    _LOWER_STORAGE = 'lower-storage',
    _FLOOR_TO_CEILING = 'floor-to-ceiling',
    _OPEN_CLOSED = 'open-closed',
    _MULTI_DEPTH = 'multi-depth',
    _CLUSTERED = 'clustered',
    _MULTI_LEVEL = 'multi-leved',
    _STAGGERED = 'staggered',
    _GEOMETRIC = 'geometric',
    _CREATIVE = 'creative',
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

export const storageArrangementOptions: CardOption[] = [
    {
        id: STORAGE_ARRANGEMENT_TYPES._SINGLE_UNIT,
        label: 'Single-unit Solution',
        icon: <VanitiesIcon />,
    },
    {
        id: STORAGE_ARRANGEMENT_TYPES._MULTI_UNIT,
        label: 'Multi-Unit Solution',
        icon: <VanitiesIcon />,
    },
    {
        id: STORAGE_ARRANGEMENT_TYPES._NOT_SURE,
        label: 'Not Sure',
        icon: <VanitiesIcon />,
    },
];

export const conceptStyleOptions: CardOption[] = [
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CLOSED_STORAGE_COLUMN,
        label: 'Closed Storage Column',
        icon: <SingleVanityIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._OPEN_STORAGE_COLUMN,
        label: 'Open Storage Column',
        icon: <DoubleVanityIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FLOATING_SHELVING,
        label: 'Floating Shelving',
        icon: <OneDrawerInnerIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._SEMI_CANCELED_STORAGE,
        label: 'Semi-Concealed Storage',
        icon: <TwoDrawerIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CUBBY_STORAGE,
        label: 'Cubby Storage',
        icon: <OpenShelvingIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._LADDER_STORAGE,
        label: 'Ladder Storage',
        icon: <MultiLevelIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._HORIZONTAL_STORAGE,
        label: 'Horizontal Storage',
        icon: <SlimProfileIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._NOOK_STORAGE,
        label: 'Nook Storage',
        icon: <CurvedVanityIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FOLD_UP_DOWN_STORAGE,
        label: 'Fold Up/Down Storage',
        icon: <TandemVanitiesIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CORNER_STORAGE,
        label: 'Corner Storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._MIRRORED_STORAGE,
        label: 'Mirrored Storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._ROTATING_REVOLVED_STORAGE,
        label: 'Rotating, Revolving Storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._RECESSED_STORAGE,
        label: 'Recessed Storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._LIGHTED_STORAGE,
        label: 'Lighted Storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FLOOR_MOUNT_STORAGE,
        label: 'Floor-mount Storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._LOWER_STORAGE,
        label: 'Lower storage',
        icon: <TandemVanitiesIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FLOOR_TO_CEILING,
        label: 'Floor-to-Ceiling',
        icon: <TandemVanitiesIcon />,
    },
];

export const sinkTypesOptions: CardOption[] = [
    {
        id: SINK_TYPE_TYPES._INTEGRATED,
        label: 'Integrated',
        icon: <VanitiesIcon />,
    },
    {
        id: SINK_TYPE_TYPES._VESSEL,
        label: 'Vessel',
        icon: <VanitiesIcon />,
    },
    {
        id: SINK_TYPE_TYPES._UNDERMOUNT,
        label: 'Undermount',
        icon: <VanitiesIcon />,
    },
];

export const colorTypesOptions: TagOption[] = [
    { label: 'Beige', id: COLOR_TYPES._BEIGE },
    { label: 'Black', id: COLOR_TYPES._BLACK },
    { label: 'Blue', id: COLOR_TYPES._BLUE },
    { label: 'Brown', id: COLOR_TYPES._BROWN },
    { label: 'Cream', id: COLOR_TYPES._CREAM },
    { label: 'Green', id: COLOR_TYPES._GREEN },
    { label: 'Orange', id: COLOR_TYPES._ORANGE },
    { label: 'Pink', id: COLOR_TYPES._PINK },
    { label: 'Red', id: COLOR_TYPES._RED },
    { label: 'White', id: COLOR_TYPES._WHITE },
    { label: 'Yellow', id: COLOR_TYPES._YELLOW },
];

export const lookTypesOptions: TagOption[] = [
    { label: 'Cement-Look', id: LOOK_TYPES._CEMENT_LOOK },
    { label: 'Metallic', id: LOOK_TYPES._METALLIC_LOOK },
    { label: 'Stone/Marble-look', id: LOOK_TYPES._STONE_MARBLE_LOOK },
    { label: 'Wood-look', id: LOOK_TYPES._WOODLOOK },
];
