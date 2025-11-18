import clsx from 'clsx';
import type { HomeExampleProps } from './types';
import Counter from './components/Counter';
import s from './style.module.css';

const Home: React.FC<HomeExampleProps> = () => {
    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <div className={s.inner}>
                <header className={s.header}>
                    <h1 className={s.title}>
                        <br /> <span className={s.vite}>Vite</span> + <span className={s.react}>React</span> +
                        <span className={s.typescript}>Typescript</span> +{' '}
                        <span className={s['tanstack-router']}>Tanstack Router</span>
                    </h1>
                </header>
                <section className={s.content}>
                    <Counter />
                    <p className={s.description}>
                        Start editing <code>src/modules/Home/Home.tsx</code> to start a project
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Home;
