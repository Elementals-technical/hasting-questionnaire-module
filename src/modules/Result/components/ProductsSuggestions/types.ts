import { ProductsSuggest } from '@/tanstackQuery/types';
import { ProductsStepData } from '@/modules/Home/components/shared/MultiStepForm/types';

export type ProductsSuggestionsProps = {
    products: ProductsSuggest[] | undefined;
    selectedProducts: ProductsStepData['products'];
};
