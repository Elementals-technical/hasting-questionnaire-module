import ReactGA from 'react-ga4';

/**
 * Отправляет событие шага квиза в GA4
 * @param stepValue - номер шага (number) или его название (string)
 */
export const trackQuizStep = (stepValue: number | string): void => {
    // 2. Отправляем как событие для удобного построения воронки
    ReactGA.event({
        category: 'Quiz',
        action: 'step_completed',
        label: `Step ${stepValue}`,
    });
};

/**
 * Відправляє подію повного завершення квіза
 * @param resultType - опціонально: тип результату, який отримав користувач (наприклад, категорія товарів)
 */
export const trackQuizComplete = (resultType?: string): void => {
    // 1. Фіксуємо фінальну віртуальну сторінку "Дякуємо"
    ReactGA.send({
        hitType: 'pageview',
        page: '/quiz/result',
        title: 'Quiz Completed Success',
    });

    // 2. Відправляємо подію генерації ліда (стандартна подія GA4)
    ReactGA.event({
        category: 'Conversion',
        action: 'generate_lead', // Це стандартна назва, яку GA4 легко розпізнає
        label: resultType || 'General Quiz',
    });
};
