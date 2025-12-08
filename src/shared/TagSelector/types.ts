// types.ts
export interface TagOption {
    id: string;
    label: string;
    value: string;
}

export interface TagSelectorProps {
    title?: string;
    options: TagOption[];
    selected: string[];
    onSelect: (_values: string[]) => void;
    placeholder?: string;
    className?: string;
    maxTags?: number;
}
