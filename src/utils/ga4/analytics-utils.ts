import ReactGA from 'react-ga4';

/**
 * Отправляет событие шага квиза в GA4
 * @param stepValue - номер шага (number) или его название (string)
 */
export const trackQuizStep = (stepValue: number | string): void => {
    // 1. Отправляем как просмотр виртуальной страницы
    ReactGA.send({
        hitType: 'pageview',
        page: `/quiz/step-${stepValue}`,
        title: `Quiz Step ${stepValue}`,
    });

    // 2. Отправляем как событие для удобного построения воронки
    ReactGA.event({
        category: 'Quiz',
        action: 'step_completed',
        label: `Step ${stepValue}`,
    });
};
