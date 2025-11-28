import { AboutProjectForm } from './steps/AboutProjectStep/AboutProjectStep';
import { BathroomFocusForm } from './steps/BathroomFocusStep/BathroomFocusForm';
import { EmailForm } from './steps/EmailStep/EmailForm';
import { NameForm } from './steps/NameStep/NameForm';
import { ProductsForm } from './steps/ProductsStep/ProductsForm';
import { RoomStyleForm } from './steps/RoomStyleStep/RoomStyleForm';
import { BathroomsForm } from './steps/SelectBathroomsStep/BathroomsForm';
import { StageForm } from './steps/StageStep/StageStep';
import { MultiStepFormProvider } from '@/shared/MultiStepForm/MultiStepFormContext';
import { MultiStepFormStep } from '@/shared/MultiStepForm/MultiStepFormStep';
import { MultiStepFormWrapper } from '@/shared/MultiStepForm/MultiStepFormWrapper/MultiStepFormWrapper';
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
                </MultiStepFormWrapper>
            </div>
        </MultiStepFormProvider>
    );
};
