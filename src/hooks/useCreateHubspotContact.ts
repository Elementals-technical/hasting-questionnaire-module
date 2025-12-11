// src/hooks/useCreateHubspotContact.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createHubspotContact, refreshAccessToken } from '@/api/hubspot/api';
import { HubspotContactFormFields, HubspotCreateContactResponse } from '@/api/hubspot/types';

type HubspotMutationOptions = UseMutationOptions<HubspotCreateContactResponse, Error, HubspotContactFormFields>;

export const useCreateHubspotContact = (options?: HubspotMutationOptions) => {
    const handleCreateContact = async (fields: HubspotContactFormFields) => {
        const { access_token } = await refreshAccessToken();

        // Обгортка для спроби/повторної спроби
        const executeRequest = async (token: string) => {
            // Викликаємо функцію API, передаючи дані та поточний токен
            return await createHubspotContact(fields, token);
        };

        return await executeRequest(access_token);
    };

    // --- 3. Повернення useMutation ---
    return useMutation<HubspotCreateContactResponse, Error, HubspotContactFormFields>({
        // mutationFn тепер приймає fields і викликає обробник з логікою токена
        mutationFn: handleCreateContact,

        onSuccess: (data, variables, context) => {
            console.log('HubSpot Contact created successfully. ID:', data.id);
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            console.error('Failed to create HubSpot Contact:', error, 'Variables:', variables);
            options?.onError?.(error, variables, context);
        },
        ...options,
    });
};
