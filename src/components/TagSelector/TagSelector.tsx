import { FC, useState } from 'react';
import { TagSelectorProps } from './types';
import PlusIcon from '@/assets/icons/common/PlusIcon';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import s from './TagSelector.module.scss';

const TagSelector: FC<TagSelectorProps> = ({
    title,
    options,
    selected,
    onSelect,
    placeholder = 'Add',
    className,
    maxTags,
}) => {
    const [open, setOpen] = useState(false);

    const handleToggle = (value: string) => {
        if (selected.includes(value)) {
            onSelect(selected.filter((v) => v !== value));
        } else {
            if (maxTags && selected.length >= maxTags) return;
            onSelect([...selected, value]);
        }
    };

    const handleRemove = (value: string) => {
        onSelect(selected.filter((v) => v !== value));
    };

    const availableOptions = options.filter((opt) => !selected.includes(opt.id));

    return (
        <div className={clsx(s.container, className)}>
            {title && <h3 className={s.title}>{title}</h3>}

            <div className={s.tagsWrapper}>
                {/* Selected Tags */}
                {selected.map((value) => {
                    const option = options.find((opt) => opt.id === value);
                    if (!option) return null;

                    return (
                        <button key={option.id} className={s.tag} onClick={() => handleRemove(value)} type="button">
                            <span>{option.label}</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={s.closeIcon}
                            >
                                <path
                                    d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    );
                })}

                {/* Add Button with Popover */}
                <Popover.Root open={open} onOpenChange={setOpen}>
                    <Popover.Trigger asChild>
                        <button
                            className={clsx(s.addButton, { [s.disabled]: maxTags && selected.length >= maxTags })}
                            disabled={!!(maxTags && selected.length >= maxTags)}
                            type="button"
                        >
                            <span>{placeholder}</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 3.5V10.5M3.5 7H10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </Popover.Trigger>

                    <Popover.Portal>
                        <Popover.Content className={s.popoverContent} sideOffset={8} align="start">
                            {availableOptions.length > 0 ? (
                                <div className={s.optionsList}>
                                    {availableOptions.map((option, index) => (
                                        <div key={option.id}>
                                            <button
                                                key={option.id}
                                                className={s.option}
                                                onClick={() => {
                                                    handleToggle(option.id);
                                                    setOpen(false);
                                                }}
                                                type="button"
                                            >
                                                <PlusIcon className={s.plusIcon} />
                                                <span>{option.label}</span>
                                            </button>
                                            {index < availableOptions.length - 1 && <div className={s.divider} />}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={s.emptyState}>All options selected</div>
                            )}
                            <Popover.Arrow className={s.popoverArrow} />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>
        </div>
    );
};

export default TagSelector;
