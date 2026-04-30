import { useEffect } from 'react';
import HeaderBG from '../../assets/images/output.jpg';
import { useGetProductsSuggest } from '@/tanstackQuery/queries/products_suggest';
import { useLocalStorageValue } from '@react-hookz/web';
import { MULTI_STEP_FORM_INITIAL_STATE } from '@/modules/Home/components/shared/MultiStepForm/constants';
import { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';
import { WorkflowStep } from '@/modules/Home/components/shared/WorkflowSteps/WorkflowStep';
import AestheticsDesigner from '@/modules/Result/components/AestheticsDesigner/AestheticsDesigner';
import BonusSuggestions from '@/modules/Result/components/BonusSuggestions/BonusSuggestions';
import ProductsSuggestions from '@/modules/Result/components/ProductsSuggestions/ProductsSuggestions';
import { STEPS_ITEMS } from '@/modules/Result/constants';
import s from '@/modules/Result/style.module.scss';
import { LS_VANITY_QUIZ_KEY } from '@/modules/VanityQuiz/vanityQuizSteps';
import { trackQuizComplete } from '@/utils/ga4/analytics-utils';

export const VanityResultRoute = () => {
    const { data } = useGetProductsSuggest();

    const { value } = useLocalStorageValue<string>(LS_VANITY_QUIZ_KEY);
    const formData = value ? (JSON.parse(value) as MultiStepForm) : (MULTI_STEP_FORM_INITIAL_STATE as MultiStepForm);

    useEffect(() => {
        trackQuizComplete('Vanity Quiz');
    }, []);

    return (
        <>
            <div
                className={s.header}
                style={{
                    backgroundImage: `url(${HeaderBG})`,
                }}
            >
                <h1 className={s.title}>Thank you for completing the quiz!</h1>
                <p className={s.subtitle}>Your designer is excited to get started!</p>
            </div>
            <div className={s.wrap}>
                <h3 className={s.label}>What’s next</h3>
                <div className={s.steps}>
                    {STEPS_ITEMS.map((i) => {
                        return (
                            <WorkflowStep
                                key={i.title}
                                className={s.step}
                                title={i.title}
                                description={i.description}
                                icon={i.icon}
                            />
                        );
                    })}
                </div>
            </div>
            <AestheticsDesigner
                name={formData.name.name}
                images={formData.roomStyle.rooms.map((i) => i.img).slice(0, 2)}
            />
            <BonusSuggestions images={formData.roomStyle} />
            <ProductsSuggestions selectedProducts={formData.products.products} products={data?.rows} />
        </>
    );
};
