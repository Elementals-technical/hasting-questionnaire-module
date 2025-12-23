import { AboutProjectForm } from './steps/AboutProjectStep/AboutProjectStep';
import { BasinForm } from './steps/BasinStep/BasinStep';
import { BathroomFocusForm } from './steps/BathroomFocusStep/BathroomFocusForm';
import { CountertopsForm } from './steps/CountertopsStep/CountertopsStep';
import { EmailForm } from './steps/EmailStep/EmailForm';
import { MirrorForm } from './steps/MirrorsStep/MirrorsStep';
import { NameForm } from './steps/NameStep/NameForm';
import { PedestalAndConsolesForm } from './steps/PedestalAndConsolesStep/PedestalAndConsolesStep';
import { ProductsFocusForm } from './steps/ProductsFocusStep/ProductsFocusForm';
import { ProductsForm } from './steps/ProductsStep/ProductsForm';
import { RoomStyleForm } from './steps/RoomStyleStep/RoomStyleForm';
import { BathroomsForm } from './steps/SelectBathroomsStep/BathroomsForm';
import { StageForm } from './steps/StageStep/StageStep';
import { StorageForm } from './steps/StorageStep/StorageStep';
import { ToiletsForm } from './steps/ToiletsStep/ToiletsStep';
import { TubsForm } from './steps/TubsStep/TubsStep';
import { VanitiesForm } from './steps/VanitiesStep/VanitiesStep';
import { MultiStepFormProvider } from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { MultiStepFormStep } from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormStep';
import { MultiStepFormWrapper } from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormWrapper/MultiStepFormWrapper';
import s from './Questionnaire.module.scss';

export const Questionnaire: React.FC = () => {
    return (
        <MultiStepFormProvider>
            <div className={s.wrap}>
                <MultiStepFormWrapper>
                    <MultiStepFormStep id="roomStyle">
                        <RoomStyleForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="bathrooms">
                        <BathroomsForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="bathroomFocus">
                        <BathroomFocusForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="name">
                        <NameForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="email">
                        <EmailForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="stage">
                        <StageForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="aboutProject">
                        <AboutProjectForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="products">
                        <ProductsForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="productsFocus">
                        <ProductsFocusForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="vanities">
                        <VanitiesForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="storage">
                        <StorageForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="countertops">
                        <CountertopsForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="mirror">
                        <MirrorForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="pedestalAndConsoles">
                        <PedestalAndConsolesForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="basin">
                        <BasinForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="tubs">
                        <TubsForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="toilets">
                        <ToiletsForm />
                    </MultiStepFormStep>
                </MultiStepFormWrapper>
            </div>
        </MultiStepFormProvider>
    );
};
