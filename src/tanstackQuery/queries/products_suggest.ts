import { ProductsParams } from '../types';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { getProductsSuggest } from '@/api/products_suggest';

// Query keys для products
export const productsQueryKeys = {
    all: ['products'] as const,
    allLists() {
        return [...productsQueryKeys.all, 'list'] as const;
    },
    list(params: ProductsParams = {}) {
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
export const getProductsQueryOptions = (params: ProductsParams = { page: 1, limit: 20 }) => {
    return queryOptions({
        queryKey: productsQueryKeys.list(params),
        queryFn({ signal }) {
            return getProductsSuggest({ signal, params });
        },
    });
};

export const useGetProductsSuggest = (params: ProductsParams = { page: 1, limit: 20 }) => {
    return useQuery(getProductsQueryOptions(params));
};
