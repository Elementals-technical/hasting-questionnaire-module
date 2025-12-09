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
}

export interface ProductsResponse {
    rows: Product[];
    count: number;
}

export interface ProductsParams {
    page?: number;
    limit?: number;
    // додайте інші параметри фільтрації за потреби
}
