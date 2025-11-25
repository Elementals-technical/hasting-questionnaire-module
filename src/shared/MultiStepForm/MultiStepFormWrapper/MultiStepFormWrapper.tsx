import { useMultiStepFormContext } from '../MultiStepFormContext';
import { motion } from 'framer-motion';
import s from './MultiStepFormWrapper.module.scss';

export const MultiStepFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useMultiStepFormContext();

    if (isLoading) {
        return 'Loading...';
    }

    return (
        <motion.div
            className={s.wrap}
            key={currentStepIndex}
            initial={{ x: animationDirection === 'next' ? '110%' : '-110%', scale: 0.9, opacity: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: animationDirection === 'next' ? '-110%' : '110%', scale: 0.9, opacity: 0 }}
            transition={{
                x: { type: 'spring', stiffness: 650, damping: 32, mass: 0.45 },
                scale: { type: 'spring', stiffness: 520, damping: 30, mass: 0.45 },
                opacity: { duration: 0, ease: 'easeOut' },
            }}
        >
            {children}
        </motion.div>
    );
};
