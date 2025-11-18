import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../../../Button/Button";
import { useMultiStepFormContext, useMultiStepFormStepForm } from "../../../../MultiStepForm/MultiStepFormContext";
import ChoosePresetField from "./ChoosePresetField/ChoosePresetField";
import ChooseVehicleField from "./ChooseVehicleField/ChooseVehicleField";
import s from "./VehicleStep.module.scss";
import clsx from "clsx";
export const VehiclesForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const { canGoBack, setFormStepData, goToNextStep, goToPreviousStep, goToStep } = useMultiStepFormContext();

  const { form, isLoading } = useMultiStepFormStepForm("vehicles");

  const submitHandler = form.handleSubmit((data) => {
    setFormStepData("vehicles", (data = { ...data, done: true }));

    goToNextStep();
  });
  useEffect(() => {
    const shortId = searchParams.get("shortId") ?? "";
    if (shortId && form.watch("preset") == null) {
      goToStep(2);
    }
  }, [searchParams, form]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className={s.wrap}>
      <div className={s.title}>Select your vehicle</div>

      <div className={s.body}>
        {/* {!form.watch("preset") && <ChoosePresetField form={form} />}
        {form.watch("preset") && <ChooseVehicleField form={form} />} */}
        {!showVehicleForm && <ChoosePresetField form={form} />}
        {showVehicleForm && <ChooseVehicleField form={form} />}
      </div>

      <div className={s.footer}>
        {!showVehicleForm ? (
          <Button className={clsx(s.btnBack, s.disabled)} onClick={() => form.setValue("preset", "traveler")}>
            Select Vehicles Manually
          </Button>
        ) : (
          <Button className={s.btnBack} onClick={() => setShowVehicleForm(false)}>
            Back
          </Button>
        )}
        <Button className={s.btnNext} onClick={!showVehicleForm ? () => setShowVehicleForm(true) : submitHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};
