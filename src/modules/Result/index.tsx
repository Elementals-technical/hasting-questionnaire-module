import { useGetProductsSuggest } from '@/tanstackQuery/queries/products_suggest';
import { WorkflowStep } from '@/modules/Home/components/shared/WorkflowSteps/WorkflowStep';
import { STEPS_ITEMS } from './constants';
import s from './style.module.scss';

export const ResultRoute = () => {
    const { data } = useGetProductsSuggest({ page: 1, limit: 100 });

    return (
        <>
            <div className={s.wrap}>
                <h1 className={s.title}>Thank you for completing the questionnaire!</h1>
                <p className={s.subtitle}>Your designer is excited to get started!</p>
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
