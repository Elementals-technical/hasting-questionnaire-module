import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import CurvedVanityIcon from '@/assets/icons/vanities/CurvedVanityIcon';
import MultiLevelIcon from '@/assets/icons/vanities/MultiLevelIcon';
import OneDrawerIcon from '@/assets/icons/vanities/OneDrawerIcon';
import OneDrawerInnerIcon from '@/assets/icons/vanities/OnerDrawerInnerIcon';
import OpenShelvingIcon from '@/assets/icons/vanities/OpenShelvingIcon';
import SlimProfileIcon from '@/assets/icons/vanities/SlimProfileIcon';
import TandemVanitiesIcon from '@/assets/icons/vanities/TandemVanitiesIcon';
import TwoDrawerIcon from '@/assets/icons/vanities/TwoDrawerIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { SINK_TYPE_TYPES } from '../constants';
import { CONCEPT_STYLE_VANITIES_TYPES } from '../VanitiesStep/constants';

export const COUNTERTOPS_WIDTH_LIMITS = {
    MIN: 24,
    MAX: 120,
};

export const COUNTERTOPS_DEPTH_TYPES = ['14-15"', '18-19"', '19-21"'] as const;
export const TOP_THICKNESS_COUNTERTOPS_TYPES = ['Thin', 'Thick'] as const;
export const BASIN_QUANTITY_TYPES = ['1', '2'] as const;

export enum STYLE_COUNTERTOPS_TYPES {
    _FLOATING = 'floating',
    _VANITY = 'vanity',
}

export enum FEATURES_COUNTERTOPS_TYPES {
    _TOWEL_BAR = 'towel-bar',
    _OVERFLOW = 'overflow',
}

export const styleCountertopsOptions: CardOption[] = [
    {
        id: STYLE_COUNTERTOPS_TYPES._FLOATING,
        label: 'Floating',
        icon: <VanitiesIcon />,
    },
    {
        id: STYLE_COUNTERTOPS_TYPES._VANITY,
        label: 'Vanity',
        icon: <VanitiesIcon />,
    },
];

export const conceptStyleOptions: CardOption[] = [
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._ONE_DRAWER,
        label: '1-Drawer',
        icon: <OneDrawerIcon />,
    },
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._ONE_DRAWER_INNER,
        label: '1-Drawer w. Inner Drawer',
        icon: <OneDrawerInnerIcon />,
    },
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._TWO_DRAWER,
        label: '2-Drawer',
        icon: <TwoDrawerIcon />,
    },
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._OPEN_SHELVING,
        label: 'Open Shelving',
        icon: <OpenShelvingIcon />,
    },
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._MULTI_LEVEL,
        label: 'Multi-level',
        icon: <MultiLevelIcon />,
    },
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._SLIM_PROFILE,
        label: 'Slim profile',
        icon: <SlimProfileIcon />,
    },
    {
        id: CONCEPT_STYLE_VANITIES_TYPES._CURVED_VANITY,
        label: 'Curved vanity',
        icon: <CurvedVanityIcon />,
    },

    {
        id: CONCEPT_STYLE_VANITIES_TYPES._TANDEM_VANITIES,
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
