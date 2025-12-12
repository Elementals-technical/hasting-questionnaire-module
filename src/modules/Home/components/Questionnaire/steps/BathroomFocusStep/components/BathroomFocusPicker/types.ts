import { UseFormReturn } from 'react-hook-form';
import { BathroomsFocusStepData } from '@/modules/Home/components/shared/MultiStepForm/types';

export type BathroomFocusPickerPropsT = {
    form: UseFormReturn<BathroomsFocusStepData>;
};
