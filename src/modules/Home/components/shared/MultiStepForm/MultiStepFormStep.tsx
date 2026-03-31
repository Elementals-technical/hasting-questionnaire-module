import { useMultiStepFormContext } from './MultiStepFormContext';
import { MultiStepFormStepId } from './types';

type MultiStepFormStepWrapperProps = React.PropsWithChildren<{
    /**
     * The id of the step
     */
    id: MultiStepFormStepId;
}>;

export const MultiStepFormStep: React.FC<MultiStepFormStepWrapperProps> = ({ children, id }) => {
    const { currentStep } = useMultiStepFormContext();

    if (currentStep.id !== id) {
        return null;
    }

    return children;
};
