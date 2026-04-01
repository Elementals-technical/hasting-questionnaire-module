import { motion } from 'framer-motion';
import s from './StyleHint.module.scss';

export const StyleHint = () => {
    return (
        <motion.p
            className={s.hint}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        >
            <motion.span
                className={s.ps}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
            >
                P.S.{' '}
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
                This helps our team get a feel for your overall aesthetic and style preferences
            </motion.span>
        </motion.p>
    );
};
