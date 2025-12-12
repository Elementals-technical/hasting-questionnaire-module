import { FC } from 'react';
import ImageOverlapGallery from '../ImageStyleGallery/ImageStyleGallery';
import { AesheticsDesignerProps } from './types';
import { DESIGNERS } from './constants';
import s from './AestheticsDesigner.module.scss';

const AestheticsDesigner: FC<AesheticsDesignerProps> = ({ name, images }) => {
    return (
        <div className={s.wrap}>
            <div className={s.title}>Meet your designer, {name}!</div>
            <div className={s.subtitle}>Our top suggestion for you</div>
            <div className={s.content}>
                <div className={s.designer}>
                    <img className={s.img} src={DESIGNERS[0].img} alt="DESIGNER_PHOTO" />
                    <div className={s.about}>
                        <div className={s.name}>{DESIGNERS[0].name}</div>
                        <div className={s.position}>{DESIGNERS[0].position}</div>
                        <div className={s.description}>{DESIGNERS[0].description}</div>
                    </div>
                </div>
                <div className={s.images}>
                    <ImageOverlapGallery images={images as [string, string]} />
                </div>
            </div>
        </div>
    );
};

export default AestheticsDesigner;
