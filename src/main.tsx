import React from 'react';
import { queryClient } from '@/tanstackQuery/@queryClient';
import { configContext as SvgUseConfigContext } from '@svg-use/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import type { Config } from '@svg-use/react';

import { routeTree } from './routeTree.gen';

import '@/styles/index.css';

const router = createRouter({ routeTree });

ReactGA.initialize(import.meta.env.VITE_GA_ID);

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const config: Config = {
    rewritePath: (pathOrHref) => {
        return pathOrHref;
    },
    runtimeChecksEnabled: import.meta.env.DEV,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SvgUseConfigContext.Provider value={config}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </SvgUseConfigContext.Provider>
    </React.StrictMode>
);
