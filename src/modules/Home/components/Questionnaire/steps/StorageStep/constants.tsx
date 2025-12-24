import ClusteredIcon from '@/assets/icons/storage/ClasteredIcon';
import ClosedStorageColumnIcon from '@/assets/icons/storage/ClosedStorageColumnIcon';
import CornerStorageIcon from '@/assets/icons/storage/CornerStorageIcon';
import CreativeStorageIcon from '@/assets/icons/storage/CreativeIcon';
import CubbyStorageIcon from '@/assets/icons/storage/CubbyStorageIcon';
import FloatingShelvingIcon from '@/assets/icons/storage/FloatingShelvingIcon';
import FloorMountStorageIcon from '@/assets/icons/storage/FloorMountStorageIcon';
import FloorToCeilingStorageIcon from '@/assets/icons/storage/FloorToCeilingIcon';
import FoldUpDownStorageIcon from '@/assets/icons/storage/FoldUpDownStorageIcon';
import GeometricStorageIcon from '@/assets/icons/storage/GeometricIcon';
import HorizontalIcon from '@/assets/icons/storage/HorizontalIcon';
import LadderStorageIcon from '@/assets/icons/storage/LadderStorageIcon';
import LightedStorageIcon from '@/assets/icons/storage/LightedIcon';
import LowerStorageIcon from '@/assets/icons/storage/LowerStorageIcon';
import MirroredStorageIcon from '@/assets/icons/storage/MirroredStorageIcon';
import MultiDepthStorageIcon from '@/assets/icons/storage/MultiDepthIcon';
import MultiUnitStorageIcon from '@/assets/icons/storage/MultiUnitIcon';
import NookStorageIcon from '@/assets/icons/storage/NookIcon';
import NotSureIcon from '@/assets/icons/storage/NotSureIcon';
import OpenClosedStorageIcon from '@/assets/icons/storage/OpenClosedIcon';
import OpenStorageColumnIcon from '@/assets/icons/storage/OpenStorageColumnIcon';
import RecessedStorageIcon from '@/assets/icons/storage/RecessedStorageIcon';
import RotatingStorageIcon from '@/assets/icons/storage/RotatingStorageIcon';
import SemiCanceledIcon from '@/assets/icons/storage/SemiCanceledStorageIcon';
import SingleUnitIcon from '@/assets/icons/storage/SingleUnitIcon';
import StaggeredStorageIcon from '@/assets/icons/storage/StaggeredIcon';
import MultiLevelIcon from '@/assets/icons/vanities/MultiLevelIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';
import { TagOption } from '@/modules/Home/components/shared/TagSelector/types';

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
        icon: <SingleUnitIcon />,
    },
    {
        id: STORAGE_ARRANGEMENT_TYPES._MULTI_UNIT,
        label: 'Multi-Unit Solution',
        icon: <MultiUnitStorageIcon />,
    },
    {
        id: STORAGE_ARRANGEMENT_TYPES._NOT_SURE,
        label: 'Not Sure',
        icon: <NotSureIcon />,
    },
];

export const conceptStyleOptions: CardOption[] = [
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CLOSED_STORAGE_COLUMN,
        label: 'Closed Storage Column',
        icon: <ClosedStorageColumnIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._OPEN_STORAGE_COLUMN,
        label: 'Open Storage Column',
        icon: <OpenStorageColumnIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FLOATING_SHELVING,
        label: 'Floating Shelving',
        icon: <FloatingShelvingIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._SEMI_CANCELED_STORAGE,
        label: 'Semi-Concealed Storage',
        icon: <SemiCanceledIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CUBBY_STORAGE,
        label: 'Cubby Storage',
        icon: <CubbyStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._LADDER_STORAGE,
        label: 'Ladder Storage',
        icon: <LadderStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._HORIZONTAL_STORAGE,
        label: 'Horizontal Storage',
        icon: <HorizontalIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._NOOK_STORAGE,
        label: 'Nook Storage',
        icon: <NookStorageIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FOLD_UP_DOWN_STORAGE,
        label: 'Fold Up/Down Storage',
        icon: <FoldUpDownStorageIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CORNER_STORAGE,
        label: 'Corner Storage',
        icon: <CornerStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._MIRRORED_STORAGE,
        label: 'Mirrored Storage',
        icon: <MirroredStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._ROTATING_REVOLVED_STORAGE,
        label: 'Rotating, Revolving Storage',
        icon: <RotatingStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._RECESSED_STORAGE,
        label: 'Recessed Storage',
        icon: <RecessedStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._LIGHTED_STORAGE,
        label: 'Lighted Storage',
        icon: <LightedStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FLOOR_MOUNT_STORAGE,
        label: 'Floor-mount Storage',
        icon: <FloorMountStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._LOWER_STORAGE,
        label: 'Lower storage',
        icon: <LowerStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._FLOOR_TO_CEILING,
        label: 'Floor-to-Ceiling',
        icon: <FloorToCeilingStorageIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._OPEN_CLOSED,
        label: 'Open-Closed',
        icon: <OpenClosedStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._MULTI_DEPTH,
        label: 'Multi-Depth',
        icon: <MultiDepthStorageIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CLUSTERED,
        label: 'Clustered',
        icon: <ClusteredIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._MULTI_LEVEL,
        label: 'Multi-Level',
        icon: <MultiLevelIcon />,
    },
    {
        id: CONCEPT_STYLE_STORAGE_TYPES._STAGGERED,
        label: 'Staggered',
        icon: <StaggeredStorageIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._GEOMETRIC,
        label: 'Geometric',
        icon: <GeometricStorageIcon />,
    },

    {
        id: CONCEPT_STYLE_STORAGE_TYPES._CREATIVE,
        label: 'Creative',
        icon: <CreativeStorageIcon />,
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
