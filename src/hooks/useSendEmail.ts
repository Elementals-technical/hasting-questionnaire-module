// src/hooks/useCreateHubspotContact.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';
import { FileUploadResult, sendEmail } from '@/api/hubspot/api';

type HubspotMutationOptions = UseMutationOptions<string, Error, MultiStepForm>;

export type EmailMutationData = MultiStepForm & {
    attachments: FileUploadResult[]; // Додаємо поле для результатів завантаження
};

export const useSendEmail = (options?: HubspotMutationOptions) => {
    // --- 3. Повернення useMutation ---
    return useMutation<string, Error, EmailMutationData>({
        // mutationFn тепер приймає fields і викликає обробник з логікою токена
        mutationFn: (payload) => sendEmail(payload),

        onSuccess: (data, variables, context) => {
            console.log('Email successfully sent.', data);
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            console.error('Failed to send email:', error, 'Variables:', variables);
            options?.onError?.(error, variables, context);
        },
        ...options,
    });
};
