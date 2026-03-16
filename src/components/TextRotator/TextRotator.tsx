// RotatingText.tsx
import { useEffect, useState } from 'react';
import s from './TextRotator.module.scss';

type RotatingTextProps = {
    words: string[];
    interval?: number;
};

export const RotatingText: React.FC<RotatingTextProps> = ({ words, interval = 2000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className={s.container}>
            <span key={currentIndex} className={s.word}>
                {words[currentIndex]}
            </span>
        </span>
    );
};
