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
                    if (value === undefined || value === null) return;

                    // 1. Спеціальна обробка для sortByTagIdsV2 (перетворюємо весь масив на JSON-рядок)
                    if (key === 'sortByTagIdsV2') {
                        searchParams.append(key, JSON.stringify(value));
                        return;
                    }

                    // 2. Обробка звичайних масивів (наприклад, [255, 256] -> key=255&key=256)
                    if (Array.isArray(value)) {
                        value.forEach((v) => {
                            if (v !== undefined && v !== null) {
                                searchParams.append(key, v.toString());
                            }
                        });
                        return;
                    }

                    // 3. Обробка простих значень
                    searchParams.append(key, value.toString());
                });

                // URLSearchParams автоматично закодує спеціальні символи (лапки, дужки) у %-формат
                return searchParams.toString();
            },
        },
    });
    return response.data;
};
