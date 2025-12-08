export interface SliderPropsT {
    className?: string;
    label: string;
    attributeValue: number;
    onValueChange: (_value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    showMinMax?: boolean;
}
