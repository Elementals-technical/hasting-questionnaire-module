import { ProductStepData } from '@/shared/MultiStepForm/types';
import { UseFormReturn } from 'react-hook-form';

export type ProductsPickerPropsT = {
    form: UseFormReturn<ProductStepData>;
};
