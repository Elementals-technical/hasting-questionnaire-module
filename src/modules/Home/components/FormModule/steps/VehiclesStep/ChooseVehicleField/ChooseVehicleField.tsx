import { UseFormReturn } from "react-hook-form";
import TrailerIcon from "../../../../../../assets/img/svg/vehicles/TrailerIcon";

import { SelectField } from "../../../fields/SelectField/SelectField";
import s from "./ChooseVehicleField.module.scss";
import { VehiclesStepSchema } from "../../../../../MultiStepForm/types";
import CarIcon from "../../../../../../assets/img/svg/vehicles/CarIcon";
import {
  CAR_BRAND_OPTIONS,
  CAR_MODEL_OPTIONS,
  TRAILER_BRAND_OPTIONS,
  TRAILER_MODEL_OPTIONS,
  YEAR_OPTIONS,
} from "./constants";
const ChooseVehicleField = ({ form }: { form: UseFormReturn<VehiclesStepSchema> }) => {
  return (
    <div className={s.wrap}>
      <div className={s.column}>
        <CarIcon className={s.icon} width={193} height={136} />
        <div className={s.fieldsWrap}>
          <SelectField
            name="car_brand"
            control={form.control}
            // defaultValue={CAR_BRAND_OPTIONS[0]}
            placeholder="Select..."
            options={CAR_BRAND_OPTIONS}
          />

          <SelectField
            name="car_model"
            control={form.control}
            placeholder="Select..."
            defaultValue={CAR_MODEL_OPTIONS[0]}
            options={CAR_MODEL_OPTIONS}
          />

          <SelectField
            name="car_year"
            control={form.control}
            placeholder="Select..."
            defaultValue={YEAR_OPTIONS[0]}
            options={YEAR_OPTIONS}
          />
        </div>
      </div>

      <div className={s.column}>
        <TrailerIcon width={193} height={136} className={s.icon} />
        <div className={s.fieldsWrap}>
          <SelectField
            name="traier_brand"
            control={form.control}
            placeholder="Select..."
            defaultValue={TRAILER_BRAND_OPTIONS[0]}
            options={TRAILER_BRAND_OPTIONS}
          />
          <SelectField
            name="traier_model"
            control={form.control}
            placeholder="Select..."
            // defaultValue={TRAILER_MODEL_OPTIONS[0]}
            options={TRAILER_MODEL_OPTIONS}
          />

          <SelectField
            name="traier_year"
            control={form.control}
            placeholder="Select..."
            // defaultValue={YEAR_OPTIONS[0]}
            options={YEAR_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseVehicleField;
