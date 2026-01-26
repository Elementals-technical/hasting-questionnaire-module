import { FC, useEffect, useRef, useState } from 'react';
import { ImageListItemProps } from './types';
import CheckIcon from '@/assets/icons/common/CheckIcon';
import { Box, ImageListItem as ImageItem, Skeleton } from '@mui/material';
import s from './ImageListItem.module.scss';

export const ImageListItem: FC<ImageListItemProps> = ({ item, isSelected, onToggle, currentItem }) => {
    const [loaded, setLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLLIElement>(null);
    const aspectRatio = item.height / item.width;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px', // Почати завантаження за 200px до появи
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Перевірка чи зображення вже в кеші
    useEffect(() => {
        if (shouldLoad && imgRef.current?.complete) {
            setLoaded(true);
        }
    }, [shouldLoad]);

    const handleLoad = () => {
        setLoaded(true);
    };

    return (
        <ImageItem ref={containerRef} className={s.image} sx={{ position: 'relative', minHeight: 100 }}>
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{ paddingTop: `${aspectRatio * 100}%` }}
                    animation="wave"
                />
            )}

            <Box
                component="img"
                ref={imgRef}
                src={item.image}
                alt={item.name}
                onLoad={handleLoad}
                onClick={() => onToggle(currentItem)}
                onError={() => console.error('Failed to load:', item.image)}
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    cursor: 'pointer',
                    opacity: loaded ? 1 : 0,
                    position: loaded ? 'static' : 'absolute',
                    top: 0,
                    left: 0,
                    transition: 'opacity 0.3s ease-in-out',
                }}
            />

            {loaded && isSelected && <CheckIcon className={s.imageSelected} />}
        </ImageItem>
    );
};
