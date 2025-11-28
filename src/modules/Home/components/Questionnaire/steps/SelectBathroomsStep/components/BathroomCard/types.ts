export type BathroomCardProps = {
    option: BathroomOption;
    count?: number;
    isSelected: boolean;
    onToggle: () => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
};

export type BathroomOption = {
    id: string;
    label: string;
    icon: React.ReactNode;
};
