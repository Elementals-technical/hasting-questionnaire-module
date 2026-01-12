import { MultiStepForm, MultiStepFormStep } from './types';
import {
    BASIN_DEPTH_LIMITS,
    BASIN_MOUNTING_TYPES,
    BASIN_WIDTH_LIMITS,
} from '../../Questionnaire/steps/BasinStep/constants';
import { SINK_TYPE_TYPES } from '../../Questionnaire/steps/constants';
import { COUNTERTOPS_WIDTH_LIMITS, STYLE_COUNTERTOPS_TYPES } from '../../Questionnaire/steps/CountertopsStep/constants';
import {
    MIRROR_HEIGHT_LIMITS,
    MIRROR_WIDTH_LIMITS,
    SHAPE_MIRRORS_TYPES,
} from '../../Questionnaire/steps/MirrorsStep/constants';
import {
    PEDESTAL_AND_CONSOLES_DEPTH_LIMITS,
    PEDESTAL_AND_CONSOLES_WIDTH_LIMITS,
    STYLE_TYPES,
} from '../../Questionnaire/steps/PedestalAndConsolesStep/constants';
import { PRODUCTS_TYPES } from '../../Questionnaire/steps/ProductsStep/components/BathroomPicker/constants';
import {
    CONCEPT_STYLE_STORAGE_TYPES,
    STORAGE_ARRANGEMENT_TYPES,
    STORAGE_WIDTH_LIMITS,
} from '../../Questionnaire/steps/StorageStep/constants';
import { TOILETS_MOUNTING_TYPES } from '../../Questionnaire/steps/ToiletsStep/constants';
import {
    TUBS_HEIGHT_LIMITS,
    TUBS_LENGTH_LIMITS,
    TUBS_SHAPE_TYPES,
    TUBS_WIDTH_LIMITS,
} from '../../Questionnaire/steps/TubsStep/constants';
import {
    NUMBER_OF_BASINS_VANITITES_TYPES,
    VANITIES_WIDTH_LIMITS,
} from '../../Questionnaire/steps/VanitiesStep/constants';
import {
    basinStepSchema,
    bathroomsFocusStepSchema,
    bathroomsStepSchema,
    countertopsStepSchema,
    emailStepSchema,
    mirrorsStepSchema,
    nameStepSchema,
    pedestalAndConsolesStepSchema,
    productsFocusStepSchema,
    productsStepSchema,
    projectGoalsStepSchema,
    roomStyleStepSchema,
    stageStepSchema,
    storageStepSchema,
    toiletsStepSchema,
    tubsStepSchema,
    vanitiesStepSchema,
} from './schemas';
import { Subtitle } from '../../layouts/FormStepLayout/components/Subtitle/Subtitle';

export const PRODUCT_STEP_SUBTITLE = `Don't feel compelled to answer everything. Thats why we're here!`;

export const MULTI_STEP_FORM_STEPS = {
    roomStyle: {
        id: 'roomStyle',
        label: 'Room Style',
        title: 'Select the rooms that suit your style',
        description: 'Pick as many as you want',
        schema: roomStyleStepSchema,
        enabled: true,
    },
    bathrooms: {
        id: 'bathrooms',
        label: 'Bathrooms',
        title: 'Which rooms need a ‘little love’?',
        description: 'Select as many as you like',
        schema: bathroomsStepSchema,
        enabled: true,
    },
    bathroomFocus: {
        id: 'bathroomFocus',
        label: 'Bathroom Focus',
        title: 'Great! Which room should we focus on?',
        description: 'Select one room to get started',
        schema: bathroomsFocusStepSchema,
        enabled: true,
    },
    name: {
        id: 'name',
        label: 'Name',
        title: 'Let’s get to know each other',
        schema: nameStepSchema,
        enabled: true,
    },
    email: {
        id: 'email',
        label: 'Email',
        title: `Let's keep rollin!`,
        description: `Enter you email and let's get styling`,
        schema: emailStepSchema,
        enabled: true,
    },
    stage: {
        id: 'stage',
        label: 'Stage',
        title: `What best describes the current stage of your project?`,
        schema: stageStepSchema,
        enabled: true,
    },
    aboutProject: {
        id: 'aboutProject',
        label: 'About Project',
        title: 'Let’s get to know your project a bit',
        description: 'Give us the lowdown',
        schema: projectGoalsStepSchema,
        enabled: true,
    },
    products: {
        id: 'products',
        label: 'Products',
        title: 'Which solutions are you in need of?',
        description: 'Select as many as you need',
        schema: productsStepSchema,
        enabled: true,
    },
    productsFocus: {
        id: 'productsFocus',
        label: 'Products Focus',
        title: 'Great! Which solution should we focus on first?',
        description: 'Select a product to start',
        schema: productsFocusStepSchema,
        enabled: true,
    },
    vanities: {
        id: 'vanities',
        label: 'Vanities',
        title: 'Let’s get to know your vanity musts',
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: vanitiesStepSchema,
        enabled: true,
    },
    storage: {
        id: 'storage',
        label: 'Storage',
        title: 'Let’s get to know your storage must-haves',
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: storageStepSchema,
        enabled: true,
    },
    countertops: {
        id: 'countertops',
        label: 'Countertops',
        title: 'Gives us the lowdown on your countertop needs',
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: countertopsStepSchema,
        enabled: true,
    },
    mirror: {
        id: 'mirror',
        label: 'Mirror',
        title: `Let's get to know your mirror must-haves`,
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: mirrorsStepSchema,
        enabled: true,
    },
    pedestalAndConsoles: {
        id: 'pedestalAndConsoles',
        label: 'Pedestan and Consoles',
        title: `Let's get to know your console must-haves`,
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: pedestalAndConsolesStepSchema,
        enabled: true,
    },
    basin: {
        id: 'basin',
        label: 'Basin',
        title: `Let's get to know your basin must-haves`,
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: basinStepSchema,
        enabled: true,
    },
    tubs: {
        id: 'tubs',
        label: 'Tubs',
        title: `Let's get to know your tub must-haves`,
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: tubsStepSchema,
        enabled: true,
    },
    toilets: {
        id: 'toilets',
        label: 'Toilets',
        title: `Let's get to know your toilet must-haves`,
        description: <Subtitle maxWidth={480}>{PRODUCT_STEP_SUBTITLE}</Subtitle>,
        schema: toiletsStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof MultiStepForm, MultiStepFormStep>;

export const MULTI_STEP_FORM_INITIAL_STATE: MultiStepForm = {
    roomStyle: {
        rooms: [],
    },
    bathrooms: {
        rooms: [],
    },
    bathroomFocus: {
        rooms: 'accessibleBath',
    },
    name: { name: '' },
    email: { email: '' },
    stage: { stage: '' },
    aboutProject: { projectType: '', goals: [], challenges: [] },
    products: { products: [] },
    productsFocus: { product: PRODUCTS_TYPES._MIRROR },
    vanities: {
        width: VANITIES_WIDTH_LIMITS.MIN,
        depth: '19-21"',
        color: [],
        mountingType: 'wall',
        sinkType: undefined,
        conceptStyle: [],
        look: [],
        numberOfBasins: NUMBER_OF_BASINS_VANITITES_TYPES._SINGLE_VANITY,
    },
    storage: {
        width: STORAGE_WIDTH_LIMITS.MIN,
        depth: '5-9.9"',
        conceptStyle: [CONCEPT_STYLE_STORAGE_TYPES._CLOSED_STORAGE_COLUMN],
        color: [],
        look: [],
        storageArrangement: STORAGE_ARRANGEMENT_TYPES._SINGLE_UNIT,
        height: 5,
    },
    countertops: {
        style: STYLE_COUNTERTOPS_TYPES._FLOATING,
        sinkType: SINK_TYPE_TYPES._INTEGRATED,
        width: COUNTERTOPS_WIDTH_LIMITS.MIN,
        depth: null,
        topThickness: null,
        basinQuantity: '1',
        color: [],
        look: [],
        features: [],
    },
    mirror: {
        shape: SHAPE_MIRRORS_TYPES._RECTANGLE,
        type: ['Lit Mirror'],
        width: MIRROR_WIDTH_LIMITS.MIN,
        height: MIRROR_HEIGHT_LIMITS.MIN,
        color: [],
        look: [],
    },
    pedestalAndConsoles: {
        width: PEDESTAL_AND_CONSOLES_WIDTH_LIMITS.MIN,
        depth: PEDESTAL_AND_CONSOLES_DEPTH_LIMITS.MIN,
        color: [],
        look: [],
        style: STYLE_TYPES._PEDESTAL,
    },
    basin: {
        width: BASIN_WIDTH_LIMITS.MIN,
        depth: BASIN_DEPTH_LIMITS.MIN,
        mountingType: BASIN_MOUNTING_TYPES._WALL_MOUNTED,
        color: [],
        look: [],
        height: 4,
    },
    tubs: {
        width: TUBS_WIDTH_LIMITS.MIN,
        color: [],
        height: TUBS_HEIGHT_LIMITS.MIN,
        shape: TUBS_SHAPE_TYPES._RECTANGLE,
        length: TUBS_LENGTH_LIMITS.MIN,
    },
    toilets: {
        color: [],
        mountingType: TOILETS_MOUNTING_TYPES._WALL_MOUNTED,
    },
};

export const ACCEPT_FILES =
    'image/jpeg,image/png,image/gif,image/webp,image/avif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
