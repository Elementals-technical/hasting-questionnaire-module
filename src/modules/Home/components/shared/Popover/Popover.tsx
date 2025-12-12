import * as React from 'react';
import CloseIcon from '@/assets/icons/common/CloseIcon';
import * as Popover from '@radix-ui/react-popover';
import s from './Popover.module.scss';

// Типізація пропсів для гнучкості
interface PopoupProps extends Popover.PopoverProps {
    /** Елемент, який буде відкривати Popover */
    trigger: React.ReactNode;
    /** Вміст, який буде відображено всередині Popover.Content */
    content: React.ReactNode;
    /** Позиціонування відносно тригера (top, bottom, left, right) */
    side?: Popover.PopoverContentProps['side'];
    /** Зсув від тригера */
    sideOffset?: number;
    /** Чи відображати стрілку Popover */
    showArrow?: boolean;
    /** Власні класи для Popover.Content */
    contentClassName?: string;
    /** Чи показувати кнопку закриття */
    showCloseButton?: boolean;
}

export const Popoup: React.FC<PopoupProps> = ({
    trigger,
    content,
    side = 'bottom',
    sideOffset = 20,
    showArrow = true,
    contentClassName = '',
    showCloseButton = true,
    ...props
}) => {
    return (
        <Popover.Root {...props}>
            <Popover.Trigger asChild>{trigger}</Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className={`${s.Content} ${contentClassName}`} side={side} sideOffset={sideOffset}>
                    {content}

                    {showCloseButton && (
                        <Popover.Close className={s.Close} aria-label="Close">
                            <CloseIcon />
                        </Popover.Close>
                    )}

                    {showArrow && <Popover.Arrow className={s.Arrow} />}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
