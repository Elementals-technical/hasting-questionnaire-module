import { UseFormReturn } from "react-hook-form";
import { RadioGroupField } from "../../../fields/RadioGroupField/RadioGroupField";
import { PRESET_OPTIONS } from "../constants";
import { VehiclesStepSchema } from "../../../../../MultiStepForm/types";

const ChoosePresetField = ({ form }: { form: UseFormReturn<VehiclesStepSchema> }) => {
  return <RadioGroupField name="preset" control={form.control} orientation="horizontal" options={PRESET_OPTIONS} />;
};

export default ChoosePresetField;
