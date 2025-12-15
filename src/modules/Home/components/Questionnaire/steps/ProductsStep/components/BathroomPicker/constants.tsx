import BasinsAndVesselsIcon from '@/assets/icons/products/BasinsAndVesselsIcon';
import CountertopsIcon from '@/assets/icons/products/CountertopsIcon';
import MirrorsIcon from '@/assets/icons/products/MirrorsIcon';
import PedestalsAndConsolesIcon from '@/assets/icons/products/PedestalsAndConsolesIcon';
import StorageIcon from '@/assets/icons/products/StorageIcon';
import ToiletsIcon from '@/assets/icons/products/ToiletsIcon';
import TubsIcon from '@/assets/icons/products/TubsIcon';
import VanitiesIcon from '@/assets/icons/products/VanitiesIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const productsOptions: CardOption[] = [
    {
        id: 'vanities',
        label: 'Vanities',
        icon: <VanitiesIcon />,
    },
    {
        id: 'storage',
        label: 'Storage',
        icon: <StorageIcon />,
    },
    {
        id: 'countertops',
        label: 'Countertops',
        icon: <CountertopsIcon />,
    },
    {
        id: 'mirrors',
        label: 'Mirrors',
        icon: <MirrorsIcon />,
    },
    {
        id: 'pedestalsAndConsoles',
        label: 'Pedestals & consoles',
        icon: <PedestalsAndConsolesIcon />,
    },
    {
        id: 'basinsAndVessels',
        label: 'Basins & Vessels',
        icon: <BasinsAndVesselsIcon />,
    },
    {
        id: 'tubs',
        label: 'Tubs',
        icon: <TubsIcon />,
    },
    {
        id: 'toilets',
        label: 'Toilets',
        icon: <ToiletsIcon />,
    },
];

export const PRODUCTS_TYPES = [
    '',
    'storage',
    'countertops',
    'mirrors',
    'pedestalsAndConsoles',
    'basinsAndVessels',
    'tubs',
    'toilets',
] as const;
