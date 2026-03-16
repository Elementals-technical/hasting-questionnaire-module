import { FC, useEffect, useState } from 'react';
import { QuoteRotatorPropsT } from './types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './QuoteRotator.module.scss';

export const QuoteRotator: FC<QuoteRotatorPropsT> = ({ className, quotes }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={clsx(styles.wrapper, className)}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className={styles.text}
                >
                    {quotes[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
