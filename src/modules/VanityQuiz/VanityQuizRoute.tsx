import { NeedOtherSolutionsForm } from './steps/NeedOtherSolutionsStep/NeedOtherSolutionsForm';
import { VanitiesCountForm } from './steps/VanityCountStep/VanitiesCountForm';
import { VanitiesForm } from './steps/VanityDetailsStep/VanitiesForm';
import { VanitiesRoomStyleForm } from './steps/VanityRoomStyleStep/VanitiesRoomStyleForm';
import { VanitiesRoomTypeForm } from './steps/VanityRoomTypeStep/VanitiesRoomTypeForm';
import clsx from 'clsx';
import { AboutProjectForm } from '@/modules/Home/components/Questionnaire/steps/AboutProjectStep/AboutProjectStep';
import { BasinForm } from '@/modules/Home/components/Questionnaire/steps/BasinStep/BasinStep';
import { CountertopsForm } from '@/modules/Home/components/Questionnaire/steps/CountertopsStep/CountertopsStep';
import { EmailForm } from '@/modules/Home/components/Questionnaire/steps/EmailStep/EmailForm';
import { MirrorForm } from '@/modules/Home/components/Questionnaire/steps/MirrorsStep/MirrorsStep';
import { NameForm } from '@/modules/Home/components/Questionnaire/steps/NameStep/NameForm';
import { PedestalAndConsolesForm } from '@/modules/Home/components/Questionnaire/steps/PedestalAndConsolesStep/PedestalAndConsolesStep';
import { StageForm } from '@/modules/Home/components/Questionnaire/steps/StageStep/StageStep';
import { StorageForm } from '@/modules/Home/components/Questionnaire/steps/StorageStep/StorageStep';
import { ToiletsForm } from '@/modules/Home/components/Questionnaire/steps/ToiletsStep/ToiletsStep';
import { TubsForm } from '@/modules/Home/components/Questionnaire/steps/TubsStep/TubsStep';
import { MultiStepFormProvider } from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormContext';
import { MultiStepFormStep } from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormStep';
import { MultiStepFormWrapper } from '@/modules/Home/components/shared/MultiStepForm/MultiStepFormWrapper/MultiStepFormWrapper';
import { LS_VANITY_QUIZ_KEY, VANITY_QUIZ_INITIAL_STATE, VANITY_QUIZ_STEPS } from '@/modules/VanityQuiz/vanityQuizSteps';
import s from './style.module.scss';

export const VanityQuizRoute: React.FC = () => {
    return (
        <MultiStepFormProvider
            localStorageKey={LS_VANITY_QUIZ_KEY}
            stepsConfig={VANITY_QUIZ_STEPS}
            resultPath={'/quiz-vanities/result'}
            initialState={VANITY_QUIZ_INITIAL_STATE}
        >
            <div className={clsx(s.wrap, 'full-height')}>
                <MultiStepFormWrapper>
                    <MultiStepFormStep id="roomStyle">
                        <VanitiesRoomStyleForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="products">
                        <VanitiesCountForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="bathrooms">
                        <VanitiesRoomTypeForm />
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
                    <MultiStepFormStep id="vanities">
                        <VanitiesForm />
                    </MultiStepFormStep>
                    <MultiStepFormStep id="needOtherSolutions">
                        <NeedOtherSolutionsForm />
                    </MultiStepFormStep>
                    {/* Optional steps */}
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
