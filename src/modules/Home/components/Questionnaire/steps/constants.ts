import { TagOption } from '../../shared/TagSelector/types';

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
