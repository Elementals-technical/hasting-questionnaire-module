import { ImageAetheticsParams, ProductsResponse } from '@/tanstackQuery/types';
import axios from 'axios';

const API_BASE_URL = 'https://hbimagett.vivid3d.tech';

interface GetProductsOptions {
    signal?: AbortSignal;
    params?: ImageAetheticsParams;
}

export const getProducts = async ({
    signal,
    params = { page: 1, limit: 20 },
}: GetProductsOptions): Promise<ProductsResponse> => {
    const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/products`, {
        signal,
        params,
        paramsSerializer: {
            serialize: (params) => {
                const searchParams = new URLSearchParams();

                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        // Якщо це масив [90, 38], додаємо кожен елемент з тим самим ключем
                        value.forEach((v) => searchParams.append(key, v.toString()));
                    } else if (value !== undefined && value !== null) {
                        searchParams.append(key, value.toString());
                    }
                });

                return searchParams.toString();
            },
        },
    });
    return response.data;
};
