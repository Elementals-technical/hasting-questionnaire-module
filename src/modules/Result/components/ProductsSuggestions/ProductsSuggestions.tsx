import { FC, useMemo, useState } from 'react';
import { ProductsSuggestionsProps } from './types';
import { PRODUCT_STEP_TO_DISPLAY_NAME, ProductDisplayName } from '@/modules/Home/components/shared/MultiStepForm/types';
import { Button } from '@/components/ui';
import s from './ProductsSuggestions.module.scss';

const ProductsSuggestions: FC<ProductsSuggestionsProps> = ({ products = [], selectedProducts }) => {
    const [activeFilter, setActiveFilter] = useState<ProductDisplayName | 'All'>('All');

    // Отримуємо унікальні категорії на основі обраних користувачем продуктів
    const availableFilters = useMemo(() => {
        const filters = new Set<ProductDisplayName>();

        selectedProducts.forEach((selected) => {
            const displayName = PRODUCT_STEP_TO_DISPLAY_NAME[selected.id];
            if (displayName) {
                filters.add(displayName);
            }
        });

        return Array.from(filters);
    }, [selectedProducts]);

    // Фільтруємо продукти на основі активного фільтра
    const filteredProducts = useMemo(() => {
        if (activeFilter === 'All') {
            return products;
        }

        return products?.filter((product) => product.collection === activeFilter) || [];
    }, [products, activeFilter]);

    if (!products || products.length === 0) return null;

    if (!products) return;

    return (
        <div className={s.suggest}>
            <span className={s.title}>
                Explore recommended products while your designer <span>gets to it.</span>
            </span>

            {/* Кнопки фільтрів */}
            {availableFilters.length > 0 && (
                <div className={s.filters}>
                    <Button
                        className={`${s.filterButton} ${activeFilter === 'All' ? s.active : ''}`}
                        onClick={() => setActiveFilter('All')}
                    >
                        All
                    </Button>
                    {availableFilters.map((filter) => (
                        <Button
                            key={filter}
                            className={`${s.filterButton} ${activeFilter === filter ? s.active : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
            )}

            <div className={s.products}>
                {filteredProducts.map((i) => {
                    return (
                        <div className={s.item}>
                            <img
                                className={s.image}
                                src={import.meta.env.VITE_THREEKIT_FAST_COMPOSITOR + i.img}
                                alt=""
                            />
                            <span className={s.itemTitle}>{i.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsSuggestions;
