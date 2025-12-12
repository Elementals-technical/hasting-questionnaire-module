import { FC } from 'react';
import { SubstylesSlider } from '../SubstylesSlider/SubstylesSlider';
import { SubstyleSlide } from '../SubstylesSlider/types';
import { BonusSuggestionsProps } from './types';
import { ImageList, ImageListItem } from '@mui/material';
import s from './BonusSuggestions.module.scss';

const BonusSuggestions: FC<BonusSuggestionsProps> = ({ images }) => {
    const MAIN_STYLE = 'Parisian Modern.';
    const MAIN_STYLE_DSCR = `The French do it better, and so do you. Your design wishlist includes rich velvet furniture, ornate gilded mirrors, and sculptural lighting. You love to mix vintage and modern, and your home has that effortlessly chic je ne sais quoi. Romance, edginess, history and glamour? To that, you say, "Oui, sil vous plaît."`;

    const substyleSlides: SubstyleSlide[] = [
        {
            id: '1',
            title: 'New Classic',
            description: `Your Pinterest board includes inspiration from Ralph Lauren, Nancy Meyers, and Ina Garten. You opt for timeless over trendy and believe in the staying power of a perfectly tailored sofa and solid wood furniture. You're all about understated elegance and decor that's sophisticated but never stuffy. After a long week, you're too often found watching a rom-com with wine in hand.`,
        },
        {
            id: '2',
            title: 'Modern Minimalist',
            description: `Clean lines and neutral palettes are your go-to. You appreciate the beauty of simplicity and believe that less is more. Your space is carefully curated with intentional pieces that serve both form and function. You're drawn to Scandinavian design and Japanese aesthetics.`,
        },
        {
            id: '3',
            title: 'Bohemian Chic',
            description:
                'Your style is eclectic and free-spirited. You love mixing patterns, textures, and colors to create a space that feels lived-in and welcoming. Vintage finds and handmade pieces tell the story of your travels and experiences. Plants are essential to your décor.',
        },
    ];
    return (
        <div className={s.wrap}>
            <div className={s.title}>Bonus!</div>
            <div className={s.substyle}>See your personal design style and sub-styles</div>
            <div className={s.styleSection}>
                <div className={s.left}>
                    <div className={s.styleTitle}>Based on our algorithm, your main style is </div>
                    <div className={s.mainStyleTitle}>{MAIN_STYLE}</div>
                    <div className={s.styleSubtitle}>ABOUT YOUR STYLE</div>
                    <div className={s.styleDescription}>{MAIN_STYLE_DSCR}</div>
                    <SubstylesSlider slides={substyleSlides} />
                </div>

                <div className={s.right}>
                    <ImageList variant="masonry" cols={2} gap={16}>
                        {images.map((item) => {
                            return (
                                <ImageListItem key={item}>
                                    <img srcSet={item} src={item} alt={'product'} loading="lazy" />
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
