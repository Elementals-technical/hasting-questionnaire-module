import { ProductsParams, ProductsSuggestResponse } from '@/tanstackQuery/types';
import axios from 'axios';

const API_BASE_URL = 'https://hbswatchcart.vivid3d.tech';

interface GetProductsOptions {
    signal?: AbortSignal;
    params?: ProductsParams;
}

export const getProductsSuggest = async ({
    signal,
    params = { page: 1, limit: 20 },
}: GetProductsOptions): Promise<ProductsSuggestResponse> => {
    const response = await axios.get<ProductsSuggestResponse>(`${API_BASE_URL}/products`, {
        signal,
        params,
    });
    return response.data;
};
