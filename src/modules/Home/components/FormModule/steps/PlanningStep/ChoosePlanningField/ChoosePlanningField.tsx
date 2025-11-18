import { UseFormReturn } from "react-hook-form";

import s from "./ChoosePlanningField.module.scss";
import Planning from "../../../../../../assets/img/planning/310_plan.png";
import { PlanningStepSchema } from "../../../../../MultiStepForm/types";

import { PLANNING_OPTIONS } from "./constants";
import clsx from "clsx";
import { useState } from "react";
const ChoosePlanningField = ({ form }: { form: UseFormReturn<PlanningStepSchema> }) => {
  const [active, setActive] = useState("");
  return (
    <div className={s.wrap}>
      <div className={s.plannings}>
        {PLANNING_OPTIONS.map((i, idx) => {
          return (
            <div
              className={clsx(s.item, { [s.disabled]: i.disabled }, i.value === active && s.active)}
              onClick={() => !i.disabled && setActive(i.value)}
            >
              <img src={Planning} alt="Planning" />
              <div className={s.label}>{i.label}</div>
              <div className={s.description}>{i.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChoosePlanningField;
