import React from 'react';
import clsx from 'clsx';
import s from './ImageStyleGallery.module.scss';

interface ImageOverlapGalleryProps {
    /** Масив URL-адрес, що містить рівно два зображення. */
    images: [string, string];
    /** CSS-клас для додаткового стилю контейнера */
    className?: string;
}

/**
 * Компонент для відображення двох зображень, накладених одне на одне
 * з ефектом зміщення, імітуючи наданий знімок.
 */
const ImageOverlapGallery: React.FC<ImageOverlapGalleryProps> = ({ images, className }) => {
    const [imgPrimary, imgOverlap] = images;
    if (images.length !== 2) {
        throw new Error('ImageOverlapGallery requires exactly two image URLs.');
    }

    return (
        <div className={clsx(s.overlapGalleryContainer, className)}>
            {/* Перше (головне) зображення - на задньому плані */}
            <img className={clsx(s.galleryImage, s.primaryImage)} src={imgPrimary} alt="Primary view" />

            {/* Друге (накладене) зображення - зміщене */}
            <img className={clsx(s.galleryImage, s.overlapImage)} src={imgOverlap} alt="Overlapping view" />
        </div>
    );
};

export default ImageOverlapGallery;
