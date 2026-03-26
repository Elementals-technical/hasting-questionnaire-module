import { PRODUCTS_TYPES } from '@/modules/Home/components/Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import {
    MULTI_STEP_FORM_INITIAL_STATE,
    MULTI_STEP_FORM_STEPS,
} from '@/modules/Home/components/shared/MultiStepForm/constants';

export const LS_VANITY_QUIZ_KEY = 'HASTINGS_vanity-quiz';

export const VANITY_QUIZ_INITIAL_STATE = {
    ...MULTI_STEP_FORM_INITIAL_STATE,
    products: { products: [{ id: PRODUCTS_TYPES._VANITIES, count: 1 }] },
    productsFocus: { product: PRODUCTS_TYPES._VANITIES },
    needOtherSolutions: { no: true, products: [] },
    vanitiesEntries: [MULTI_STEP_FORM_INITIAL_STATE.vanities],
};

export const VANITY_QUIZ_STEPS = {
    // Desired linear order for the vanity quiz:
    // roomStyle -> products (# of vanities) -> bathrooms (room types)
    // -> name -> email -> stage -> aboutProject -> vanities (repeat)
    // -> needOtherSolutions -> (product steps)
    roomStyle: {
        ...MULTI_STEP_FORM_STEPS.roomStyle,
        enabled: true,
    },
    // Step #2: # of vanities (repurpose products step UI)
    products: {
        ...MULTI_STEP_FORM_STEPS.products,
        label: '# of vanities',
        title: 'How many vanities are you looking for?',
        description: 'Select as many as you need',
        enabled: true,
    },
    // Step #3: Room Type
    bathrooms: {
        ...MULTI_STEP_FORM_STEPS.bathrooms,
        label: 'Room Type',
        title: 'Which room types are these vanities for?',
        description: 'Select all that apply',
        enabled: true,
    },
    // not used in vanity flow
    bathroomFocus: {
        ...MULTI_STEP_FORM_STEPS.bathroomFocus,
        enabled: false,
    },
    name: { ...MULTI_STEP_FORM_STEPS.name, enabled: true },
    email: { ...MULTI_STEP_FORM_STEPS.email, enabled: true },
    stage: { ...MULTI_STEP_FORM_STEPS.stage, enabled: true },
    aboutProject: { ...MULTI_STEP_FORM_STEPS.aboutProject, enabled: true },
    // Step #8: Vanity details (repeated inside a custom UI)
    vanities: { ...MULTI_STEP_FORM_STEPS.vanities, enabled: true },
    // Step #9: Need other solutions?
    needOtherSolutions: { ...MULTI_STEP_FORM_STEPS.needOtherSolutions, enabled: true },
    // not used in vanity flow
    productsFocus: { ...MULTI_STEP_FORM_STEPS.productsFocus, enabled: false },
    // Product steps (kept enabled so we can jump into them if user selects other solutions)
    storage: { ...MULTI_STEP_FORM_STEPS.storage, enabled: true },
    countertops: { ...MULTI_STEP_FORM_STEPS.countertops, enabled: true },
    mirror: { ...MULTI_STEP_FORM_STEPS.mirror, enabled: true },
    pedestalAndConsoles: { ...MULTI_STEP_FORM_STEPS.pedestalAndConsoles, enabled: true },
    basin: { ...MULTI_STEP_FORM_STEPS.basin, enabled: true },
    tubs: { ...MULTI_STEP_FORM_STEPS.tubs, enabled: true },
    toilets: { ...MULTI_STEP_FORM_STEPS.toilets, enabled: true },
} as const;
