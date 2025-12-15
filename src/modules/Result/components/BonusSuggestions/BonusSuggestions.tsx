import { FC } from 'react';
import { SubstylesSlider } from '../SubstylesSlider/SubstylesSlider';
import { BonusSuggestionsProps } from './types';
import { determineDominantStyles } from './utils';
import { ImageList, ImageListItem } from '@mui/material';
import { SUBSTYLES } from './constants';
import s from './BonusSuggestions.module.scss';

const BonusSuggestions: FC<BonusSuggestionsProps> = ({ images }) => {
    const aesthetics = determineDominantStyles(images.rooms, SUBSTYLES);

    return (
        <div className={s.wrap}>
            <div className={s.title}>Bonus!</div>
            <div className={s.subtitle}>See your personal design style and sub-styles</div>
            <div className={s.styleSection}>
                <div className={s.left}>
                    <div className={s.styleTitle}>Based on our algorithm, your main style is </div>
                    <div className={s.mainStyleTitle}>{aesthetics?.mainStyle.title}</div>
                    <div className={s.styleSubtitle}>ABOUT YOUR STYLE</div>
                    <div className={s.styleDescription}>{aesthetics?.mainStyle.description}</div>
                    <SubstylesSlider slides={aesthetics?.substyles || []} />
                </div>

                <div className={s.right}>
                    <ImageList variant="masonry" cols={2} gap={16}>
                        {images.rooms.map((item) => {
                            return (
                                <ImageListItem key={item.img}>
                                    <img srcSet={item.img} src={item.img} alt={'product'} loading="lazy" />
                                </ImageListItem>
                            );
                        })}
                    </ImageList>
                </div>
            </div>
        </div>
    );
};

export default BonusSuggestions;
