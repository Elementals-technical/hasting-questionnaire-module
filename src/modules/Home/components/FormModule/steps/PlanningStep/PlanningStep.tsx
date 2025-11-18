import Button from "../../../../Button/Button";
import { useMultiStepFormContext, useMultiStepFormStepForm } from "../../../../MultiStepForm/MultiStepFormContext";
import ChoosePlanningField from "./ChoosePlanningField/ChoosePlanningField";
import s from "./Planning.module.scss";
export const PlanningForm: React.FC = () => {
  const { canGoBack, setFormStepData, goToNextStep, goToPreviousStep } = useMultiStepFormContext();

  const { form, isLoading } = useMultiStepFormStepForm("planning");

  const submitHandler = form.handleSubmit((data) => {
    setFormStepData("planning", (data = { ...data, done: true }));
    goToNextStep();
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className={s.wrap}>
      <div className={s.title}>Select planning</div>

      <div className={s.body}>
        <ChoosePlanningField form={form} />
      </div>

      <div className={s.footer}>
        <Button className={s.btnBack} onClick={goToPreviousStep}>
          Back
        </Button>
        <Button className={s.btnNext} onClick={submitHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};
