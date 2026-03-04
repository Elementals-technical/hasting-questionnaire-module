import { FC } from 'react';
import { ImageListItemProps } from './types';
import CheckIcon from '@/assets/icons/common/CheckIcon';
import { Box, ImageListItem as ImageItem } from '@mui/material';
import s from './ImageListItem.module.scss';

export const ImageListItem: FC<ImageListItemProps> = ({ item, isSelected, onToggle, currentItem }) => {
    return (
        <ImageItem className={s.image} sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
                component="img"
                src={item.image}
                alt={item.name}
                onClick={() => onToggle(currentItem)}
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    cursor: 'pointer',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out',
                }}
            />

            {/* Іконка вибору */}
            {isSelected && <CheckIcon className={s.imageSelected} />}
        </ImageItem>
    );
};
