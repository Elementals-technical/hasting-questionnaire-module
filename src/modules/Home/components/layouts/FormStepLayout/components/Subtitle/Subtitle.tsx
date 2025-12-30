// components/Subtitle/Subtitle.tsx

import { CSSProperties } from 'react';
import clsx from 'clsx';
import s from './Subtitle.module.scss';

interface SubtitleProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: string | number; // '600px' або 600
}

export const Subtitle: React.FC<SubtitleProps> = ({ children, className, maxWidth }) => {
    const style: CSSProperties = maxWidth
        ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }
        : {};

    return (
        <div className={clsx(s.subtitle, className)} style={style}>
            {children}
        </div>
    );
};
