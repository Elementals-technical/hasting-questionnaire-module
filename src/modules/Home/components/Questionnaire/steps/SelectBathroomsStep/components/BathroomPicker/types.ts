import { UseFormReturn } from 'react-hook-form';
import { BathroomsStepData } from '@/modules/Home/components/shared/MultiStepForm/types';

export type BathroomsPickerPropsT = {
    form: UseFormReturn<BathroomsStepData>;
};
