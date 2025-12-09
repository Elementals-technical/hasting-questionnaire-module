import { ProductsParams, ProductsResponse } from '@/tanstackQuery/types';
import axios from 'axios';

const API_BASE_URL = 'https://hbimagett.vivid3d.tech';

interface GetProductsOptions {
    signal?: AbortSignal;
    params?: ProductsParams;
}

export const getProducts = async ({
    signal,
    params = { page: 1, limit: 20 },
}: GetProductsOptions): Promise<ProductsResponse> => {
    const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/products`, {
        signal,
        params,
    });
    return response.data;
};
