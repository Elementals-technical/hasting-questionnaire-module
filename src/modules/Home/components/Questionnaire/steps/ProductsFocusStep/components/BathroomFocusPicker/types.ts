import { UseFormReturn } from 'react-hook-form';
import { ProductsFocusStepData } from '@/modules/Home/components/shared/MultiStepForm/types';

export type ProductsFocusPickerPropsT = {
    form: UseFormReturn<ProductsFocusStepData>;
};
