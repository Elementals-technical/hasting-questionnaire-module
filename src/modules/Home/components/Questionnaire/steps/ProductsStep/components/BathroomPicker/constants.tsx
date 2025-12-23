import BasinsAndVesselsIcon from '@/assets/icons/products/BasinsAndVesselsIcon';
import CountertopsIcon from '@/assets/icons/products/CountertopsIcon';
import MirrorsIcon from '@/assets/icons/products/MirrorsIcon';
import PedestalsAndConsolesIcon from '@/assets/icons/products/PedestalsAndConsolesIcon';
import StorageIcon from '@/assets/icons/products/StorageIcon';
import ToiletsIcon from '@/assets/icons/products/ToiletsIcon';
import TubsIcon from '@/assets/icons/products/TubsIcon';
import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export enum PRODUCTS_TYPES {
    _VANITIES = 'vanities',
    _STORAGE = 'storage',
    _COUNTERTOPS = 'countertops',
    _MIRROR = 'mirror',
    _PEDESTALS_AND_CONSOLES = 'pedestalAndConsoles',
    _BASIN = 'basin',
    _TUBS = 'tubs',
    _TOILETS = 'toilets',
}

export const productsOptions: CardOption[] = [
    {
        id: PRODUCTS_TYPES._VANITIES,
        label: 'Vanities',
        icon: <VanitiesIcon />,
    },
    {
        id: PRODUCTS_TYPES._STORAGE,
        label: 'Storage',
        icon: <StorageIcon />,
    },
    {
        id: PRODUCTS_TYPES._COUNTERTOPS,
        label: 'Countertops',
        icon: <CountertopsIcon />,
    },
    {
        id: PRODUCTS_TYPES._MIRROR,
        label: 'Mirrors',
        icon: <MirrorsIcon />,
    },
    {
        id: PRODUCTS_TYPES._PEDESTALS_AND_CONSOLES,
        label: 'Pedestals & consoles',
        icon: <PedestalsAndConsolesIcon />,
    },
    {
        id: PRODUCTS_TYPES._BASIN,
        label: 'Basins & Vessels',
        icon: <BasinsAndVesselsIcon />,
    },
    {
        id: PRODUCTS_TYPES._TUBS,
        label: 'Tubs',
        icon: <TubsIcon />,
    },
    {
        id: PRODUCTS_TYPES._TOILETS,
        label: 'Toilets',
        icon: <ToiletsIcon />,
    },
] as const;
