import { useEffect, useState } from 'react';
import FloatingIcon from '@/assets/icons/countertop/FloatingIcon';
import VanityIcon from '@/assets/icons/countertop/VanityIcon';
import CurvedVanityIcon from '@/assets/icons/vanities/CurvedVanityIcon';
import MultiLevelIcon from '@/assets/icons/vanities/MultiLevelIcon';
import OneDrawerIcon from '@/assets/icons/vanities/OneDrawerIcon';
import OpenShelvingIcon from '@/assets/icons/vanities/OpenShelvingIcon';
import SlimProfileIcon from '@/assets/icons/vanities/SlimProfileIcon';
import TandemVanitiesIcon from '@/assets/icons/vanities/TandemVanitiesIcon';
import TwoDrawerIcon from '@/assets/icons/vanities/TwoDrawerIcon';
import { AnimatePresence, motion } from 'framer-motion';
import s from './VanitiesTransitionOverlay.module.scss';

const ICONS = [
    CurvedVanityIcon,
    TwoDrawerIcon,
    OneDrawerIcon,
    OpenShelvingIcon,
    SlimProfileIcon,
    TandemVanitiesIcon,
    MultiLevelIcon,
    FloatingIcon,
    VanityIcon,
];

const INTERVAL_MS = 1000;

const transition = {
    duration: 0.38,
    ease: [0.4, 0, 0.2, 1] as const,
};

interface Props {
    nextIndex: number;
    total: number;
}

const VanitiesTransitionOverlay = ({ nextIndex, total }: Props) => {
    const [cursor, setCursor] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCursor((c) => c + 1);
        }, INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    const remaining = total - nextIndex;

    const getIcon = (offset: number) => {
        const idx = (((cursor + offset) % ICONS.length) + ICONS.length) % ICONS.length;
        return ICONS[idx]!;
    };

    // Three visible slots: left (-1), center (0), right (+1)
    // We give each a stable key = cursor+offset so AnimatePresence knows
    // which element is entering/exiting.
    const slots = [-1, 0, 1] as const;

    return (
        <div className={s.overlay}>
            <div className={s.carousel} aria-hidden>
                {slots.map((offset) => {
                    const Icon = getIcon(offset);
                    const isCenter = offset === 0;
                    const key = cursor + offset;

                    return (
                        <AnimatePresence mode="popLayout" key={offset}>
                            <motion.div
                                key={key}
                                className={s.slot}
                                data-center={isCenter}
                                initial={{ x: 80, opacity: 0, scale: 0.7 }}
                                animate={{
                                    x: 0,
                                    opacity: isCenter ? 1 : 0.35,
                                    scale: 1,
                                }}
                                exit={{ x: -80, opacity: 0, scale: 0.7 }}
                                transition={transition}
                            >
                                <Icon />
                            </motion.div>
                        </AnimatePresence>
                    );
                })}
            </div>

            <p className={s.title}>Which vanity should we work on next?</p>

            <div className={s.badge}>
                Vanity {nextIndex + 1}
                <span className={s.badgeSep}>/</span>
                {total}
            </div>

            {remaining > 1 && (
                <p className={s.remaining}>
                    {remaining - 1} more {remaining - 1 === 1 ? 'vanity' : 'vanities'} to go
                </p>
            )}
        </div>
    );
};

export default VanitiesTransitionOverlay;
