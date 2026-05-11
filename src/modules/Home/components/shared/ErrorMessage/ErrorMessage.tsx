import { FC } from 'react';
import clsx from 'clsx';
import s from './ErrorMessage.module.scss';

const ErrorMessage: FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <p className={clsx(s.error, className)}>{children}</p>;
};

export default ErrorMessage;
