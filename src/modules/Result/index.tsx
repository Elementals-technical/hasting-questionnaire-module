import { useGetProductsSuggest } from '@/tanstackQuery/queries/products_suggest';
import { useLocalStorageValue } from '@react-hookz/web';
import { WorkflowStep } from '@/modules/Home/components/shared/WorkflowSteps/WorkflowStep';
import { STEPS_ITEMS } from './constants';
import { LS_MULTI_STEP_FORM_KEY, MULTI_STEP_FORM_INITIAL_STATE } from '../Home/components/shared';
import { MultiStepForm } from '../Home/components/shared/MultiStepForm/types';
import AestheticsDesigner from './components/AestheticsDesigner/AestheticsDesigner';
import BonusSuggestions from './components/BonusSuggestions/BonusSuggestions';
import s from './style.module.scss';

export const ResultRoute = () => {
    const { data } = useGetProductsSuggest({ page: 1, limit: 100 });

    const { value } = useLocalStorageValue<string>(LS_MULTI_STEP_FORM_KEY);

    const formData = value ? (JSON.parse(value) as MultiStepForm) : (MULTI_STEP_FORM_INITIAL_STATE as MultiStepForm);

    return (
        <>
            <div
                className={s.header}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),url(${formData.roomStyle.rooms[0].img})`,
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
            <div className={s.suggest}>
                <span className={s.title}>
                    Explore recommended products while your designer <span>gets to it </span> .
                </span>
                <div className={s.products}>
                    {data?.rows.map((i) => {
                        return (
                            <div className={s.item}>
                                <img
                                    className={s.image}
                                    src={import.meta.env.VITE_THREEKIT_FAST_COMPOSITOR + i.img}
                                    alt=""
                                />
                                <span className={s.itemTitle}>{i.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ResultRoute;
