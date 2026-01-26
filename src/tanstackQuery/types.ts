import { ProductDisplayName } from '@/modules/Home/components/shared/MultiStepForm/types';

export interface Tag {
    id: number;
    name: string;
    color: string | null;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
}

export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    parentId: number | null;
    tags: Tag[];
    children: Category[];
}

export interface Product {
    id: number;
    name: string;
    originalImage: string;
    image: string;
    previewImage: string;
    metadata: string;
    markers: string; // JSON string
    createdAt: string;
    updatedAt: string;
    categories: Category[];
    width: number;
    height: number;
    size: number;
}

export interface ProductsSuggest {
    id: number;

    collection: ProductDisplayName;

    name: string;

    assetId: string;

    img: string;

    hash: string;

    available: boolean;

    createdAt: string;

    updatedAt: string;
}

export interface ProductsResponse {
    rows: Product[];
    count: number;
}

export interface ProductsSuggestResponse {
    rows: ProductsSuggest[];
    count: number;
}

export interface ImageAetheticsParams {
    page?: number;
    limit: number;
    tagId?: number;
    sortByTagId?: number | number[];
}

export interface ProductsParams {
    page?: number;
    pageSize: number;
}
