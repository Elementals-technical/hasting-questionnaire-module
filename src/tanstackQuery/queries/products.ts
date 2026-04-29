import { ImageAetheticsParams } from '../types';
import { queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';

// Query keys для products
export const productsQueryKeys = {
    all: ['products'] as const,
    allLists() {
        return [...productsQueryKeys.all, 'list'] as const;
    },
    list(
        params: ImageAetheticsParams = {
            limit: 20,
        }
    ) {
        return [...productsQueryKeys.allLists(), params] as const;
    },
    allItems() {
        return [...productsQueryKeys.all, 'item'] as const;
    },
    item(id: number) {
        return [...productsQueryKeys.allItems(), id] as const;
    },
};

// Query options для products
export const getProductsQueryOptions = (params: ImageAetheticsParams = { page: 1, limit: 20 }) => {
    return queryOptions({
        queryKey: productsQueryKeys.list(params),
        queryFn({ signal }) {
            return getProducts({ signal, params });
        },
    });
};

export const useGetProducts = (params?: ImageAetheticsParams) => {
    return useQuery(getProductsQueryOptions(params));
};

// Новий хук для infinity scroll
export const useGetProductsInfinite = (params: Omit<ImageAetheticsParams, 'page'>) => {
    return useInfiniteQuery({
        queryKey: [...productsQueryKeys.list(params), 'infinite'],
        queryFn: ({ signal, pageParam }) => {
            return getProducts({
                signal,
                params: {
                    ...params,
                    cursor: pageParam,
                    limit: 20,
                    // sortByTagId: [255, 256],
                    sortByTagIdsV2: [
                        { tagId: 255, percentage: 70 },
                        { tagId: 256, percentage: 15 },
                    ],
                },
            });
        },
        initialPageParam: null as ImageAetheticsParams['cursor'],
        getNextPageParam: (lastPage) => {
            // Зупиняємося, якщо даних немає
            if (!lastPage.rows || lastPage.rows.length === 0) {
                return undefined;
            }

            // Повертаємо nextCursor з бекенду (якщо він є)
            return lastPage.nextCursor ?? undefined;
        },
    });
};
