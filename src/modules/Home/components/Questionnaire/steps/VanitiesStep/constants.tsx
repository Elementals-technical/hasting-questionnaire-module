import CurvedVanityIcon from '@/assets/icons/vanities/CurvedVanityIcon';
import DoubleVanityIcon from '@/assets/icons/vanities/DoubleVanityIcon';
import FloorIcon from '@/assets/icons/vanities/FloorIcon';
import IntegratedIcon from '@/assets/icons/vanities/IntegratedVanitiesIcon';
import MultiLevelIcon from '@/assets/icons/vanities/MultiLevelIcon';
import OneDrawerIcon from '@/assets/icons/vanities/OneDrawerIcon';
import OneDrawerInnerIcon from '@/assets/icons/vanities/OnerDrawerInnerIcon';
import OpenShelvingIcon from '@/assets/icons/vanities/OpenShelvingIcon';
import SingleVanityIcon from '@/assets/icons/vanities/SingleVanityIcon';
import SlimProfileIcon from '@/assets/icons/vanities/SlimProfileIcon';
import TandemVanitiesIcon from '@/assets/icons/vanities/TandemVanitiesIcon';
import TwoDrawerIcon from '@/assets/icons/vanities/TwoDrawerIcon';
import UndermountVanitiesIcon from '@/assets/icons/vanities/UndermountVanitiesIcon';
import VesselVanitiesIcon from '@/assets/icons/vanities/VesselVanitiesIcon';
import WallIcon from '@/assets/icons/vanities/WallIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { SINK_TYPE_TYPES } from '../constants';

export const VANITIES_WIDTH_LIMITS = {
    MIN: 24,
    MAX: 120,
};

export const VANITIES_DEPTH_TYPES = ['14-15"', '18-19"', '19-21"'] as const;
export const MOUNTING_TYPE_TYPES = ['wall', 'floor'] as const;

export enum NUMBER_OF_BASINS_VANITITES_TYPES {
    _SINGLE_VANITY = 'single-vanity',
    _DOUBLE_VANITY = 'double-vanity',
}

export enum CONCEPT_STYLE_VANITIES_TYPES {
    _ONE_DRAWER = '1-drawer',
    _ONE_DRAWER_INNER = '1-drawer-inner',
    _TWO_DRAWER = '2-drawer',
    _OPEN_SHELVING = 'open-shelving',
    _MULTI_LEVEL = 'multi-level',
    _SLIM_PROFILE = 'slim-profile',
    _CURVED_VANITY = 'curved-vanity',
    _TANDEM_VANITIES = 'tandem-vanities',
}

export const mountingTypesOptions: CardOption[] = [
    {
        id: 'wall',
        label: 'Wall',
        icon: <WallIcon />,
    },
    {
        id: 'floor',
        label: 'Floor',
        icon: <FloorIcon />,
    },
];

export const numberOfBasinsOptions: CardOption[] = [
    {
        id: NUMBER_OF_BASINS_VANITITES_TYPES._SINGLE_VANITY,
        label: 'Single Basin',
        icon: <SingleVanityIcon />,
    },
    {
        id: NUMBER_OF_BASINS_VANITITES_TYPES._DOUBLE_VANITY,
        label: 'Double Basin',
        icon: <DoubleVanityIcon />,
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
        icon: <IntegratedIcon />,
    },
    {
        id: SINK_TYPE_TYPES._VESSEL,
        label: 'Vessel',
        icon: <VesselVanitiesIcon />,
    },
    {
        id: SINK_TYPE_TYPES._UNDERMOUNT,
        label: 'Undermount',
        icon: <UndermountVanitiesIcon />,
    },
];
