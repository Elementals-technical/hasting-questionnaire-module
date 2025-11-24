import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { Control, Controller, FieldPath, FieldValue, FieldValues } from 'react-hook-form';
import s from './SelectField.module.scss';

type Option = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
};

type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>;
    defaultValue?: FieldValue<TFieldValues> | undefined;
    control: Control<TFieldValues>;
    label?: string;
    placeholder?: string;
    options: Option[];
    className?: string;
    disabled?: boolean;
};

export const SelectField = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    placeholder = 'Select…',
    options,
    className,
    disabled,
    defaultValue,
}: Props<TFieldValues>) => {
    return (
        <Controller
            name={name}
            control={control}
            //   defaultValue={defaultValue}
            render={({ field, fieldState }) => {
                const error = fieldState.error?.message;
                const id = `sl-${name.replace(/\./g, '-')}`;

                return (
                    <div className={clsx(s.wrap, className)}>
                        {label && (
                            <label htmlFor={id} className={s.legend}>
                                {label}
                            </label>
                        )}

                        <Select.Root value={field.value ?? ''} onValueChange={field.onChange} disabled={disabled}>
                            <Select.Trigger
                                id={id}
                                onBlur={field.onBlur}
                                className={clsx(s.trigger, error && s.triggerError, disabled && s.triggerDisabled)}
                                aria-invalid={!!error || undefined}
                            >
                                <Select.Value placeholder={placeholder} />
                                <Select.Icon className={s.icon}>
                                    {/* chevron */}
                                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                                        <path
                                            d="M6 9l6 6 6-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal>
                                <Select.Content className={s.content} position="popper" sideOffset={6}>
                                    <Select.ScrollUpButton className={s.scrollBtn}>▲</Select.ScrollUpButton>
                                    <Select.Viewport className={s.viewport}>
                                        {options.map((opt) => {
                                            return (
                                                <Select.Item
                                                    key={opt.value}
                                                    value={opt.value}
                                                    disabled={opt.disabled}
                                                    className={clsx(s.item, opt.disabled && s.itemDisabled)}
                                                >
                                                    <Select.ItemText>
                                                        <div className={s.itemText}>
                                                            <div className={s.itemLabel}>{opt.label}</div>
                                                            {opt.description && (
                                                                <div className={s.itemDesc}>{opt.description}</div>
                                                            )}
                                                        </div>
                                                    </Select.ItemText>
                                                    <Select.ItemIndicator className={s.check}>
                                                        {/* check */}
                                                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                                                            <path
                                                                d="M20 6L9 17l-5-5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </Select.ItemIndicator>
                                                </Select.Item>
                                            );
                                        })}
                                    </Select.Viewport>
                                    <Select.ScrollDownButton className={s.scrollBtn}>▼</Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>

                        {error && (
                            <div role="alert" className={s.error}>
                                {error}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};
