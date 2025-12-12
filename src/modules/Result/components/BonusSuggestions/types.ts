import { SubstyleSlide } from '../SubstylesSlider/types';
import { RoomStyleStepData } from '@/modules/Home/components/shared/MultiStepForm/types';

export type BonusSuggestionsProps = {
    images: RoomStyleStepData;
};

export interface Room {
    img: string;
    aesthetics: string[];
}

export interface AestheticResult {
    mainStyle: SubstyleSlide;
    substyles: SubstyleSlide[];
}
