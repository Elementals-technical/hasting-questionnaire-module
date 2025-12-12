import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import CurvedVanityIcon from '@/assets/icons/vanities/CurvedVanityIcon';
import DoubleVanityIcon from '@/assets/icons/vanities/DoubleVanityIcon';
import MultiLevelIcon from '@/assets/icons/vanities/MultiLevelIcon';
import OneDrawerIcon from '@/assets/icons/vanities/OneDrawerIcon';
import OneDrawerInnerIcon from '@/assets/icons/vanities/OnerDrawerInnerIcon';
import OpenShelvingIcon from '@/assets/icons/vanities/OpenShelvingIcon';
import SingleVanityIcon from '@/assets/icons/vanities/SingleVanityIcon';
import SlimProfileIcon from '@/assets/icons/vanities/SlimProfileIcon';
import TandemVanitiesIcon from '@/assets/icons/vanities/TandemVanitiesIcon';
import TwoDrawerIcon from '@/assets/icons/vanities/TwoDrawerIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { TagOption } from '@/modules/Home/components/shared/TagSelector/types';

export const VANITIES_DEPTH_TYPES = ['14-15"', '18-19"', '19-21"'] as const;
export const MOUNTING_TYPE_TYPES = ['wall', 'floor'];

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

export const conceptStyleOptions: CardOption[] = [
    {
        id: CONCEPT_STYLE_TYPES._SINGLE_VANITY,
        label: 'Single vanity',
        icon: <SingleVanityIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._DOUBLE_VANITY,
        label: 'Double vanity',
        icon: <DoubleVanityIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._ONE_DRAWER,
        label: '1-Drawer',
        icon: <OneDrawerIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._ONE_DRAWER_INNER,
        label: '1-Drawer w. Inner Drawer',
        icon: <OneDrawerInnerIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._TWO_DRAWER,
        label: '2-Drawer',
        icon: <TwoDrawerIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._OPEN_SHELVING,
        label: 'Open Shelving',
        icon: <OpenShelvingIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._MULTI_LEVEL,
        label: 'Multi-level',
        icon: <MultiLevelIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._SLIM_PROFILE,
        label: 'Slim profile',
        icon: <SlimProfileIcon />,
    },
    {
        id: CONCEPT_STYLE_TYPES._CURVED_VANITY,
        label: 'Curved vanity',
        icon: <CurvedVanityIcon />,
    },

    {
        id: CONCEPT_STYLE_TYPES._TANDEM_VANITIES,
        label: 'Tandem Vanities',
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
