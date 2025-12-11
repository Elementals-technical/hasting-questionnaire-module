// src/api/hubspot.types.ts

// Поля, які ми очікуємо з форми
export interface HubspotContactFormFields {
    email: string;
    firstname: string;
    lastname?: string;
    phone?: string;
    // ... інші поля HubSpot (наприклад, quiz_result, company)
}

/**
 * Структура тіла запиту, яку HubSpot вимагає для створення контакту
 */
export interface HubspotRequestPayload {
    fields: HubspotContactFormFields;
    accessToken: string;
}

/**
 * Спрощена структура відповіді від HubSpot
 */
export interface HubspotCreateContactResponse {
    id: string;
    createdAt: string;
    properties: {
        email: string;
        firstname: string;
        // ...
    };
    // ...
}

/**
 * Інтерфейс для відповіді від HubSpot /oauth/v1/token.
 * Використовується як для обміну коду, так і для оновлення токена.
 */
export interface HubspotTokenResponse {
    /** Тип токена, завжди 'bearer'. */
    token_type: 'bearer';

    /** Токен оновлення. Використовується для отримання нового access_token. */
    refresh_token: string;

    /** Робочий токен доступу. Використовується у заголовку Authorization. */
    access_token: string;

    /** Унікальний ID порталу HubSpot (Hub). */
    hub_id: number;

    /** Масив дозволів, які має цей токен (наприклад, 'crm.objects.contacts.write'). */
    scopes: string[];

    /** Час дії access_token у секундах (зазвичай 1800 сек = 30 хв). */
    expires_in: number;
}

// ... Додайте сюди інші ваші типи (HubspotContactFormFields, HubspotCreateContactResponse тощо)
