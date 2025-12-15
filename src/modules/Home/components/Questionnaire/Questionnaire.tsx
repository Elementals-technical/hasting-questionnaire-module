import { AboutProjectForm } from './steps/AboutProjectStep/AboutProjectStep';
import { BathroomFocusForm } from './steps/BathroomFocusStep/BathroomFocusForm';
import { EmailForm } from './steps/EmailStep/EmailForm';
import { NameForm } from './steps/NameStep/NameForm';
import { ProductsFocusForm } from './steps/ProductsFocusStep/ProductsFocusForm';
import { ProductsForm } from './steps/ProductsStep/ProductsForm';
import { RoomStyleForm } from './steps/RoomStyleStep/RoomStyleForm';
import { BathroomsForm } from './steps/SelectBathroomsStep/BathroomsForm';
import { StageForm } from './steps/StageStep/StageStep';
import { StorageForm } from './steps/StorageStep/StorageStep';
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
                </MultiStepFormWrapper>
            </div>
        </MultiStepFormProvider>
    );
};
