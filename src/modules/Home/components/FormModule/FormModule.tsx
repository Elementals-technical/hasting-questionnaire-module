import { MultiStepFormProvider } from "../../MultiStepForm/MultiStepFormContext";
import { MultiStepFormStep } from "../../MultiStepForm/MultiStepFormStep";
import { MultiStepFormWrapper } from "../../MultiStepForm/MultiStepFormWrapper/MultiStepFormWrapper";
import s from "./FormModule.module.scss";
import Stepper from "./Stepper/Stepper";
import { ConfiguratorForm } from "./steps/ConfiguratorStep/ConfiguratorStep";
import { PlanningForm } from "./steps/PlanningStep/PlanningStep";
import { VehiclesForm } from "./steps/VehiclesStep/VehiclesStep";
import { CartForm } from "./steps/CartStep/CartStep";
export const FormModule: React.FC = () => {
  return (
    <MultiStepFormProvider>
      <div className={s.wrap}>
        <header className={s.header}>
          <Stepper />
        </header>
        <MultiStepFormWrapper>
          <MultiStepFormStep id="vehicles">
            <VehiclesForm />
          </MultiStepFormStep>
          <MultiStepFormStep id="planning">
            <PlanningForm />
          </MultiStepFormStep>
          <MultiStepFormStep id="configurator">
            <ConfiguratorForm />
          </MultiStepFormStep>
          <MultiStepFormStep id="cart">
            <CartForm />
          </MultiStepFormStep>
        </MultiStepFormWrapper>
      </div>
    </MultiStepFormProvider>
  );
};
