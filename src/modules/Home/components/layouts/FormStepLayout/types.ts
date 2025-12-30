import React from 'react';
import { ReactNode } from '@tanstack/react-router';

export type FormStepLayoutProps = {
    title: string | React.ReactNode;
    description?: ReactNode;
    children: React.ReactNode;
};
