import clsx from "clsx";
import { MULTI_STEP_FORM_STEPS, useMultiStepFormContext } from "../../../MultiStepForm/MultiStepFormContext";
import s from "./Stepper.module.scss";
import ChevronRightIcon from "../../../../assets/img/svg/ChevronRightIcon";

const Stepper = () => {
  const { currentStep, goToStep, steps, formData } = useMultiStepFormContext();

  return (
    <div className={s.wrap}>
      {Object.entries(MULTI_STEP_FORM_STEPS).map(([key, value], idx, array) => {
        return (
          <>
            <div
              key={key}
              onClick={() => goToStep(idx)}
              className={clsx(
                s.item,
                { [s.done]: formData[value.id].done },
                { [s.active]: currentStep.id === value.id }
              )}
            >
              {value.label}
            </div>
            {idx !== array.length - 1 && (
              <ChevronRightIcon className={clsx(s.chevron, { [s.done]: formData[value.id].done })} />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
