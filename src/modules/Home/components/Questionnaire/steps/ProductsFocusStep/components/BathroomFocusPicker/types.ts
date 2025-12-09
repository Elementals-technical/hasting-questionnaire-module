import { ProductsFocusStepData } from '@/shared/MultiStepForm/types';
import { UseFormReturn } from 'react-hook-form';

export type ProductsFocusPickerPropsT = {
    form: UseFormReturn<ProductsFocusStepData>;
};
