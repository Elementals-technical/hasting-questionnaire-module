// src/hooks/useCreateHubspotContact.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';
import { sendEmail } from '@/api/hubspot/api';

type HubspotMutationOptions = UseMutationOptions<string, Error, MultiStepForm>;

export const useSendEmail = (options?: HubspotMutationOptions) => {
    const handleSendEmail = async (payload: MultiStepForm) => {
        return await sendEmail(payload);
    };

    // --- 3. Повернення useMutation ---
    return useMutation<string, Error, MultiStepForm>({
        // mutationFn тепер приймає fields і викликає обробник з логікою токена
        mutationFn: handleSendEmail,

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
