import { FC } from 'react';
import s from './ErrorMessage.module.scss';

const ErrorMessage: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <p className={s.error}>{children}</p>;
};

export default ErrorMessage;
