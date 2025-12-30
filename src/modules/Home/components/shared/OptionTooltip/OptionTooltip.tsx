import React, { HTMLAttributes, useState } from 'react';
import CloseIcon from '@/assets/icons/common/CloseIcon';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import styles from './OptionTooltip.module.scss';

interface OptionTooltipProps {
    tooltipText?: string;
    isSelected?: boolean;
    className?: string;
    children: React.ReactElement<HTMLAttributes<HTMLElement>>;
}

export const OptionTooltip: React.FC<OptionTooltipProps> = ({ tooltipText, isSelected, className, children }) => {
    const [open, setOpen] = useState(false);

    const combinedClassName = clsx(
        styles.infoIcon,
        isSelected && styles.infoIconSelected,
        open && styles.infoIconSelected,
        className,
        children.props.className
    );

    // Якщо немає тексту → просто повертаємо дитину
    if (!tooltipText) {
        return React.cloneElement(children, {
            className: combinedClassName,
        });
    }

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                {React.cloneElement(children, {
                    className: combinedClassName,
                    onClick: (e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation();
                        setOpen(!open);

                        if (children.props.onClick) {
                            children.props.onClick(e);
                        }
                    },
                })}
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className={styles.tooltipContent} side="bottom" sideOffset={5}>
                    <p>{tooltipText}</p>
                    <CloseIcon onClick={() => setOpen(false)} />
                    <Popover.Arrow className={styles.tooltipArrow} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
