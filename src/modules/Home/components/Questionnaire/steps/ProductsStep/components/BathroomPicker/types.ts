import { UseFormReturn } from 'react-hook-form';
import { ProductsStepData } from '@/modules/Home/components/shared/MultiStepForm/types';

export type ProductsPickerPropsT = {
    form: UseFormReturn<ProductsStepData>;
};
