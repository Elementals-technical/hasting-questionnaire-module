import {
    HubspotContactFormFields,
    HubspotCreateContactResponse,
    HubspotRequestPayload,
    HubspotTokenResponse,
} from './types';
import axios from 'axios';
import { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';

const PROXY_URL = import.meta.env.VITE_DO_PROXY;

/**
 * Створює новий контакт безпосередньо в HubSpot (використовуючи Private App Token).
 * @param fields - Дані контакту (email, firstname, etc.).
 * @returns Promise<HubspotCreateContactResponse>
 */
export async function createHubspotContact(
    fields: HubspotContactFormFields,
    TOKEN: string
): Promise<HubspotCreateContactResponse> {
    // Формування тіла запиту, як вимагає HubSpot
    const payload: HubspotRequestPayload = {
        fields: fields,
        accessToken: TOKEN,
    };

    const HUBSPOT_CONTACTS_ENDPOINT = '/hubspot-proxy/api/hubspot/create-contact';

    const url = `${PROXY_URL}${HUBSPOT_CONTACTS_ENDPOINT}`;

    if (!TOKEN) {
        throw new Error('HubSpot Access Token is missing from environment variables.');
    }

    const response = await axios.post<HubspotCreateContactResponse>(url, payload, {
        headers: {
            // Використання токена
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

/**
 * Використовує refresh_token для отримання нової пари access_token/refresh_token.
 *
 * @param refreshToken - Поточний токен оновлення.
 * @returns Promise<RefreshTokenResponse>
 */
export async function refreshAccessToken(): Promise<HubspotTokenResponse> {
    const REFRESH_TOKEN = 'na1-a368-06a3-4d13-b3aa-01bc5640401c';

    const REFRESH_ENDPOINT = `${PROXY_URL}/hubspot-proxy/api/hubspot/refresh-token`;

    const body = {
        refreshToken: REFRESH_TOKEN,
    };

    try {
        const response = await axios.post<HubspotTokenResponse>(REFRESH_ENDPOINT, body);

        return response.data;
    } catch (error) {
        console.error('Error refreshing token', error);
        throw new Error('Failed to refresh HubSpot access token.');
    }
}

/**
 * Відправити користувачу емейл з даними опитувальника.
 *
 * @param refreshToken - Поточний токен оновлення.
 * @returns Promise<RefreshTokenResponse>
 */
export async function sendEmail(payload: MultiStepForm): Promise<string> {
    const EMAIL_ENDPOINT = `${PROXY_URL}/email/send`;

    try {
        const response = await axios.post<string>(EMAIL_ENDPOINT, payload, {
            headers: { authorization: 'zCxGZgV3iVUR93C2Cua2lTgZZZppRL1z32VifmzwdPgcP' },
        });

        return response.data;
    } catch (error) {
        console.error('Error sending email', error);
        throw new Error('Failed to send email.');
    }
}
