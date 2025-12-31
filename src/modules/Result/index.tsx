import HeaderBG from '../../assets/images/output.jpg';
import { useGetProductsSuggest } from '@/tanstackQuery/queries/products_suggest';
import { useLocalStorageValue } from '@react-hookz/web';
import { WorkflowStep } from '@/modules/Home/components/shared/WorkflowSteps/WorkflowStep';
import { MULTI_STEP_FORM_INITIAL_STATE } from '../Home/components/shared/MultiStepForm/constants';
import { STEPS_ITEMS } from './constants';
import { LS_MULTI_STEP_FORM_KEY } from '../Home/components/shared';
import { MultiStepForm } from '../Home/components/shared/MultiStepForm/types';
import AestheticsDesigner from './components/AestheticsDesigner/AestheticsDesigner';
import BonusSuggestions from './components/BonusSuggestions/BonusSuggestions';
import ProductsSuggestions from './components/ProductsSuggestions/ProductsSuggestions';
import s from './style.module.scss';

export const ResultRoute = () => {
    const { data } = useGetProductsSuggest();

    const { value } = useLocalStorageValue<string>(LS_MULTI_STEP_FORM_KEY);

    const formData = value ? (JSON.parse(value) as MultiStepForm) : (MULTI_STEP_FORM_INITIAL_STATE as MultiStepForm);

    return (
        <>
            <div
                className={s.header}
                style={{
                    backgroundImage: `url(${HeaderBG})`,
                }}
            >
                <h1 className={s.title}>Thank you for completing the questionnaire!</h1>
                <p className={s.subtitle}>Your designer is excited to get started!</p>
            </div>
            <div className={s.wrap}>
                <h3 className={s.label}>What’s next</h3>
                <div className={s.steps}>
                    {STEPS_ITEMS.map((i) => {
                        return (
                            <WorkflowStep
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

export default ResultRoute;
