import { useMultiStepFormContext } from "./MultiStepFormContext";
import { MultiStepForm } from "./types";

type MultiStepFormStepWrapperProps = React.PropsWithChildren<{
  /**
   * The id of the step
   */
  id: keyof MultiStepForm;
}>;

const MultiStepFormStep: React.FC<MultiStepFormStepWrapperProps> = ({ children, id }) => {
  const { currentStep } = useMultiStepFormContext();

  if (currentStep.id !== id) {
    return null;
  }

  return children;
};
