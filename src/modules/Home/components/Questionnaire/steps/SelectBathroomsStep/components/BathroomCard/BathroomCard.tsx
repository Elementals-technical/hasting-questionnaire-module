import React from 'react';
import MinIcon from '@/assets/icons/common/MinIcon';
import PlusIcon from '@/assets/icons/common/PlusIcon';
import clsx from 'clsx';
import type { BathroomCardProps } from './types';
import { Button } from '@/components/ui';
import s from './BathroomCard.module.scss';

const BathroomCard: React.FC<BathroomCardProps> = ({
    option,
    count,
    isSelected,
    onToggle,
    onIncrement,
    onDecrement,
}) => {
    return (
        <div className={s.cardWrapper}>
            <Button className={clsx(s.card, { [s.cardSelected]: isSelected })} onClick={onToggle}>
                <div className={s.cardIcon}>{option.icon}</div>
                <span className={s.cardLabel}>{option.label}</span>
            </Button>
            <div className={s.counter}>
                <Button className={s.counterButton} onClick={onDecrement} disabled={count <= 1}>
                    <MinIcon />
                </Button>
                <span className={s.counterValue}>{count}</span>

                <Button className={s.counterButton} onClick={onIncrement}>
                    <PlusIcon />
                </Button>
            </div>
        </div>
    );
};

export default BathroomCard;
