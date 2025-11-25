import { BATHROOM_TYPES } from '../../constants';

export type BathroomCardProps = {
    option: BathroomOption;
    count: number;
    isSelected: boolean;
    onToggle: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
};

export type BathroomOption = {
    id: (typeof BATHROOM_TYPES)[number];
    label: string;
    icon: React.ReactNode;
};
