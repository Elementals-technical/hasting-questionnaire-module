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

export const useGetProducts = (params: ImageAetheticsParams) => {
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
                    page: pageParam,
                    limit: 20,
                    sortByTagId: [255, 256],
                },
            });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            // Варіант 1: Якщо бекенд повертає total
            if (lastPage.count) {
                const totalPages = Math.ceil(lastPage.count / params.limit);
                return lastPageParam < totalPages ? lastPageParam + 1 : undefined;
            }
        },
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            return firstPageParam > 1 ? firstPageParam - 1 : undefined;
        },
    });
};
