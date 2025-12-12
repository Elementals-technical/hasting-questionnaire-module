import { FC } from 'react';
import { SliderPropsT } from './types';
import clsx from 'clsx';
import { Slider as S } from 'radix-ui';
import s from './Slider.module.scss';

const Slider: FC<SliderPropsT> = ({
    className,
    label,
    attributeValue,
    onValueChange,
    min = 24,
    max = 114.2,
    step = 0.1,
    unit = '"',
    showMinMax = true,
}) => {
    return (
        <div className={clsx(s.wrap, className)}>
            <div className={s.content}>
                <span className={s.label}>{label}</span>
            </div>

            <div className={s.sliderWrapper}>
                <S.Root
                    onValueChange={([value]) => onValueChange(value)}
                    value={[attributeValue]}
                    onDoubleClick={() => onValueChange(29)}
                    className={s.Root}
                    defaultValue={[29]}
                    max={max}
                    min={min}
                    step={step}
                >
                    <S.Track className={s.Track}>
                        <S.Range className={s.Range} />
                    </S.Track>
                    <S.Thumb className={s.Thumb} aria-label="slider">
                        <div className={s.valueDisplay}>
                            {attributeValue.toFixed(1)}
                            {unit}
                        </div>
                    </S.Thumb>
                </S.Root>
            </div>
            <div className={s.valueWrapper}>
                {showMinMax && (
                    <span className={s.minValue}>
                        {min}
                        {unit}
                    </span>
                )}

                {showMinMax && (
                    <span className={s.maxValue}>
                        {max}
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Slider;
