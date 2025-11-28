export type BathroomCardProps = {
    option: CardOption;
    count?: number;
    isSelected: boolean;
    onToggle: () => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
};

export type CardOption = {
    id: string;
    label: string;
    icon: React.ReactNode;
};
