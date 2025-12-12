import { SubstyleSlide } from '../SubstylesSlider/types';
import { AestheticResult, Room } from './types';
import { TAG_TO_STYLE_ID_MAP } from './constants';

export function determineDominantStyles(rooms: Room[], allStyles: SubstyleSlide[]): AestheticResult | null {
    // Крок 1: Підрахунок частоти кожного ID стилю
    const styleFrequency: Record<string, number> = {};

    rooms.forEach((room) => {
        room.aesthetics.forEach((tag) => {
            // Спроба знайти ID за мапінгом
            let styleId = TAG_TO_STYLE_ID_MAP[tag];

            // Якщо прямого мапінгу немає, спробуємо знайти часткове співпадіння в заголовках allStyles
            if (!styleId) {
                const foundStyle = allStyles.find(
                    (s) =>
                        s.title.toLowerCase().includes(tag.toLowerCase()) ||
                        tag.toLowerCase().includes(s.title.toLowerCase())
                );
                if (foundStyle) {
                    styleId = foundStyle.id;
                }
            }

            if (styleId) {
                styleFrequency[styleId] = (styleFrequency[styleId] || 0) + 1;
            }
        });
    });

    // Крок 2: Сортування ID за частотою (спадання)
    const sortedStyleIds = Object.entries(styleFrequency)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([id]) => id);

    // Якщо нічого не знайдено, повертаємо дефолтний варіант (або null)
    if (sortedStyleIds.length === 0) {
        // Fallback: повертаємо перші 4 стилі як дефолт
        const defaults = allStyles.slice(0, 4);
        return {
            mainStyle: { id: '1', title: defaults[0].title, description: defaults[0].description },
            substyles: defaults.slice(1).map((s) => ({ id: s.title, title: s.title, description: s.description })),
        };
    }

    // Крок 3: Отримання об'єктів стилів за ID
    const getStyleById = (id: string): SubstyleSlide | undefined => allStyles.find((s) => s.id === id);

    const mainStyleObj = getStyleById(sortedStyleIds[0]);

    // Збираємо substyles (беремо наступні 3 за популярністю)
    const subStyleObjs = sortedStyleIds
        .slice(1, 4) // Беремо індекси 1, 2, 3
        .map((id) => getStyleById(id))
        .filter((s): s is SubstyleSlide => !!s); // Фільтруємо undefined

    // Крок 4: Якщо substyles менше 3-х, доповнюємо їх іншими стилями, яких ще немає в списку
    if (subStyleObjs.length < 3) {
        const existingIds = new Set([mainStyleObj?.id, ...subStyleObjs.map((s) => s.id)]);

        for (const style of allStyles) {
            if (subStyleObjs.length >= 3) break;
            if (!existingIds.has(style.id)) {
                subStyleObjs.push(style);
                existingIds.add(style.id);
            }
        }
    }

    if (!mainStyleObj) return null; // Теоретично неможливо, якщо sortedStyleIds не пустий

    // Крок 5: Формування фінального об'єкту
    return {
        mainStyle: {
            id: mainStyleObj.id,
            title: mainStyleObj.title,
            description: mainStyleObj.description,
        },
        substyles: subStyleObjs.map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description,
        })),
    };
}
