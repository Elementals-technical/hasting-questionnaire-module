import { useState } from 'react';
import { SubstyleSlide } from './types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import s from './SubstylesSilder.module.scss';

interface SubstylesSliderProps {
    title?: string;
    slides: SubstyleSlide[];
    className?: string;
}

export const SubstylesSlider = ({ title = 'Your substyles', slides, className }: SubstylesSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const currentSlide = slides[currentIndex];

    return (
        <div className={clsx(s.container, className)}>
            <h1 className={s.mainTitle}>{title}</h1>

            <div className={s.sliderContent}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.15 },
                        }}
                        className={s.slide}
                    >
                        <h2 className={s.slideTitle}>{currentSlide.title}</h2>
                        <p className={s.slideDescription}>{currentSlide.description}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className={s.dots}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={clsx(s.dot, {
                            [s.dotActive]: index === currentIndex,
                        })}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
