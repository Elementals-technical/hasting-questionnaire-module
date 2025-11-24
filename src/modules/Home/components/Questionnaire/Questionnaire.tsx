import { BathroomFocusForm } from './steps/BathroomFocusStep/BathroomFocusForm';
import { RoomStyleForm } from './steps/RoomStyleStep/RoomStyleForm';
import { BathroomsForm } from './steps/SelectBathroomsStep/BathroomsForm';
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
                    {/* <MultiStepFormStep id="name">
                        <CartForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="email">
                        <CartForm />
                    </MultiStepFormStep> */}
                </MultiStepFormWrapper>
            </div>
        </MultiStepFormProvider>
    );
};
