import { Product } from '@/tanstackQuery/types';

interface ImageSelectionData {
    img: string;
    aesthetics: string[];
}

export interface ImageListItemProps {
    currentItem: ImageSelectionData;
    isSelected: boolean;
    onToggle: (_image: ImageSelectionData) => void;
    item: Product;
}
