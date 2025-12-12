// import { ConfiguratorType } from './type';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { PhotoImage } from '../../../hooks/usePhotoThreekit';
// import { MULTI_STEP_FORM_INITIAL_STATE } from '@/modules/Home/components/shared';
// import { MultiStepForm } from '@/modules/Home/components/shared/MultiStepForm/types';

// interface MainStateI {
//     questionaryData: MultiStepForm;
// }

// const initialState: MainStateI = {
//     questionaryData: MULTI_STEP_FORM_INITIAL_STATE,
// };

// export const configuratorSlice = createSlice({
//     name: 'configurator',
//     initialState,
//     reducers: {
//         set: (state, action: PayloadAction<{ isProcessing: boolean }>) => {
//             state.isProcessing = action.payload.isProcessing;
//         },
//         setConfiguratorType: (state, action: PayloadAction<ConfiguratorType>) => {
//             state.configuratorType = action.payload;
//         },
//         setActiveProductGroup: (state, action: PayloadAction<string | undefined>) => {
//             state.activeProductGroup = action.payload;
//         },
//         setRecentColors: (state, action: PayloadAction<string>) => {
//             const color = action.payload;

//             // Удаляем, если цвет уже есть (чтобы переместить в конец)
//             state.recentColors = state.recentColors.filter((c) => c !== color);

//             // Добавляем новый цвет в конец
//             state.recentColors.push(color);

//             // Обрезаем, если длина > 10
//             if (state.recentColors.length > 15) {
//                 state.recentColors.shift(); // удаляет первый (самый старый)
//             }
//         },
//         setFullLoader: (state, action: PayloadAction<boolean>) => {
//             state.isFullLoader = action.payload;
//         },
//         setAppProduct: (state, action: PayloadAction<{ product: string; assetId: string }>) => {
//             const { product, assetId } = action.payload;
//             state.appProduct[product] = {
//                 preview: assetId,
//                 'admin-fts': assetId,
//             };
//         },
//         setDefaultCameraParams: (state, action: PayloadAction<{ pos: any; quat: any }>) => {
//             const { pos, quat } = action.payload;
//             state.cameraParams = { pos, quat };
//         },
//         setIframeAssetId: (state, action: PayloadAction<string>) => {
//             state.iframeAsset = action.payload;
//         },
//         setActiveAnnotation: (state, action: PayloadAction<string>) => {
//             state.activeAnnotation = action.payload;
//         },
//         setIsChatOpen: (state) => {
//             state.isChatOpen = !state.isChatOpen;
//         },
//         setIsShareOpen: (state) => {
//             state.isShareOpen = !state.isShareOpen;
//         },
//         setImagePreview: (state, action: PayloadAction<PhotoImage[]>) => {
//             state.imagePreview = action.payload;
//         },

//         setDefaultImageIndex: (state, action: PayloadAction<number>) => {
//             state.defaultImageIndex = action.payload;
//         },
//     },
// });

// export const {
//     changeProcessing,
//     setRecentColors,
//     setConfiguratorType,
//     setActiveProductGroup,
//     setAppProduct,
//     setFullLoader,
//     setDefaultCameraParams,
//     setIframeAssetId,
//     setActiveAnnotation,
//     setIsChatOpen,
//     setIsShareOpen,
//     setImagePreview,
//     setDefaultImageIndex,
// } = configuratorSlice.actions;

// export default configuratorSlice.reducer;
