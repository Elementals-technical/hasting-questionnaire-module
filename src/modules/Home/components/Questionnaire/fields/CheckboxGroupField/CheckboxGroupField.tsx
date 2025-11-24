import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import s from './CheckboxGroupField.module.scss';

type Option = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type Props<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label?: string;
    options: Option[];
    orientation?: 'horizontal' | 'vertical';
    className?: string;
};

export const CheckboxGroupField = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    options,
    orientation = 'vertical',
    className,
}: Props<TFieldValues>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const error = fieldState.error?.message;
                const groupId = `cg-${name.replace(/\./g, '-')}`;

                // Значення завжди масив
                const value: string[] = Array.isArray(field.value) ? field.value : [];

                const toggleValue = (val: string) => {
                    if (value.includes(val)) {
                        field.onChange(
                            value.filter((v) => {
                                return v !== val;
                            })
                        ); // remove
                    } else {
                        field.onChange([...value, val]); // add
                    }
                };

                return (
                    <fieldset className={clsx(s.fieldset, className)}>
                        {label && <legend className={s.legend}>{label}</legend>}

                        <div
                            id={groupId}
                            className={clsx(
                                s.group,
                                orientation === 'horizontal' ? s.horizontal : s.vertical,
                                error && s.groupError
                            )}
                        >
                            {options.map((opt, i) => {
                                const id = `${groupId}-${i}`;
                                const Icon = opt.icon;
                                const checked = value.includes(opt.value);

                                return (
                                    <div
                                        key={opt.value}
                                        className={clsx(s.option, { [s.active]: checked })}
                                        onClick={() => {
                                            return !opt.disabled && toggleValue(opt.value);
                                        }}
                                    >
                                        <Checkbox.Root
                                            id={id}
                                            className={clsx(s.checkbox)}
                                            checked={checked}
                                            disabled={opt.disabled}
                                            onCheckedChange={() => {
                                                return toggleValue(opt.value);
                                            }}
                                        >
                                            <Checkbox.Indicator className={s.indicator} />
                                        </Checkbox.Root>

                                        <div
                                            className={clsx(
                                                s.checkboxItem,
                                                { [s.optionDisabled]: opt.disabled },
                                                { [s.optionSelected]: checked }
                                            )}
                                        >
                                            <Icon width={143} height={161} />
                                            <span className={s.title}>{opt.label}</span>
                                            <span className={s.subtitle}>{opt.description}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {error && (
                            <div role="alert" className={s.error}>
                                {error}
                            </div>
                        )}
                    </fieldset>
                );
            }}
        />
    );
};
