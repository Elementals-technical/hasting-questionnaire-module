import { FC, useEffect, useRef, useState } from 'react';
import { ImageListItemProps } from './types';
import CheckIcon from '@/assets/icons/common/CheckIcon';
import { Box, ImageListItem as ImageItem, Skeleton } from '@mui/material';
import s from './ImageListItem.module.scss';

export const ImageListItem: FC<ImageListItemProps> = ({ item, isSelected, onToggle, currentItem }) => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Обработка случая, когда картинка уже есть в кэше
    useEffect(() => {
        if (imgRef.current?.complete) {
            setLoaded(true);
        }
    }, []);

    const handleLoad = () => {
        console.log('IMG_LOADED', item.name);
        setLoaded(true);
    };

    return (
        <ImageItem className={s.image} sx={{ position: 'relative', minHeight: 100 }}>
            {!loaded && <Skeleton variant="rectangular" width="100%" height={275} animation="wave" />}

            <Box
                component="img"
                ref={imgRef}
                src={item.image}
                alt={item.name}
                loading="lazy"
                onLoad={handleLoad}
                onClick={() => onToggle(currentItem)}
                onError={() => console.error('Failed to load:', item.image)}
                sx={{
                    width: '100%',
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
