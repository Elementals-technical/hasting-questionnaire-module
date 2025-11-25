import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import s from './RadioGroupField.module.scss';

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
    required?: boolean; // только для UI (звёздочка). Валидацию делайте в RHF/резолвере
};

export const RadioGroupField = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    options,
    orientation = 'vertical',
    className,
    required,
}: Props<TFieldValues>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const error = fieldState.error?.message;
                const groupId = `rg-${name.replace(/\./g, '-')}`;

                return (
                    <fieldset className={clsx(s.fieldset, className)}>
                        {label && (
                            <legend className={s.legend}>
                                {label}
                                {required && `*`}
                                {/** Место для * */}
                            </legend>
                        )}

                        <RadioGroup.Root
                            id={groupId}
                            orientation={orientation}
                            value={field.value ?? ''}
                            onValueChange={field.onChange}
                            onBlur={field.onBlur}
                            required={required}
                            className={clsx(
                                s.group,
                                orientation === 'horizontal' ? s.horizontal : s.vertical,
                                error && s.groupError
                            )}
                            aria-invalid={!!error || undefined}
                        >
                            {options.map((opt, i) => {
                                const id = `${groupId}-${i}`;
                                const Icon = opt.icon;
                                return (
                                    <div
                                        key={opt.value}
                                        className={clsx(s.option, { [s.active]: opt.value === field.value })}
                                    >
                                        <RadioGroup.Item
                                            id={id}
                                            className={s.radio}
                                            value={opt.value}
                                            disabled={opt.disabled}
                                            required={required}
                                        >
                                            <div
                                                className={clsx(
                                                    s.radioItem,
                                                    { [s.optionDisabled]: opt.disabled },
                                                    { [s.optionSelected]: field.value === opt.value }
                                                )}
                                            >
                                                <Icon width={143} height={161} />
                                                <span className={s.title}>{opt.label}</span>
                                                <span className={s.subtitle}>{opt?.description}</span>
                                            </div>
                                        </RadioGroup.Item>

                                        {/* <label htmlFor={id} className={s.label}>
                      <span className={s.labelText}>{opt.label}</span>
                      {opt.description && <span className={s.desc}>{opt.description}</span>}
                    </label> */}
                                    </div>
                                );
                            })}
                        </RadioGroup.Root>

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
