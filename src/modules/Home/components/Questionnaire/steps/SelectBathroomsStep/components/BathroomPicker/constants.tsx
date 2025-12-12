import AccessibleBathIcon from '@/assets/icons/products/AccessibleBathIcon';
import ChildrensBathIcon from '@/assets/icons/products/ChildrensBathIcon';
import EnsuiteBathIcon from '@/assets/icons/products/EnsuiteBathIcon';
import GuestBathIcon from '@/assets/icons/products/GuestBathIcon';
import MasterBathIcon from '@/assets/icons/products/MasterBathIcon';
import PowderRoomIcon from '@/assets/icons/products/PowderRoom';
import SmallBathIcon from '@/assets/icons/products/SmallBathIcon';
import SpaBathRoomIcon from '@/assets/icons/products/SpaBathIcon';
import { CardOption } from '@/modules/Home/components/shared/BathroomCard/types';

export const bathroomOptions: CardOption[] = [
    {
        id: 'masterBath',
        label: 'Master Bath',
        icon: <MasterBathIcon />,
    },
    {
        id: 'guestBath',
        label: 'Guest Bath',
        icon: <GuestBathIcon />,
    },
    {
        id: 'smallBath',
        label: 'Small Bath',
        icon: <SmallBathIcon />,
    },
    {
        id: 'powderRoom',
        label: 'Powder Room',
        icon: <PowderRoomIcon />,
    },
    {
        id: 'accessibleBath',
        label: 'Accessible Bath',
        icon: <AccessibleBathIcon />,
    },
    {
        id: 'childrensBath',
        label: 'Childrens Bath',
        icon: <ChildrensBathIcon />,
    },
    {
        id: 'ensuiteBath',
        label: 'Ensuite Bath',
        icon: <EnsuiteBathIcon />,
    },
    {
        id: 'spaBath',
        label: 'Spa Bath',
        icon: <SpaBathRoomIcon />,
    },
];
