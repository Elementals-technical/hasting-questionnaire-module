import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import { useMultiStepFormContext, useMultiStepFormStepForm } from "../../../../MultiStepForm/MultiStepFormContext";
import s from "./CartStep.module.scss";
import { getSubtotal } from "../../../../../store/slices/product/selectors/selectors";
import SummaryList from "../../../../SummaryList/SummaryList";
import { setIsShareOpen } from "../../../../../store/slices/configurator/Configurator.sclice";
import PlayerImagePreview from "../../../../Treble/PlayerImagePreview/PlayerImagePreview";
import Player from "../../../../Treble/Player";
import { PlayerLoader } from "../../../../Loader/PlayerLoader/PlayerLoader";
import { getImageDefaultImageIndex } from "../../../../../store/slices/configurator/selectors/selectors";
import { PlayerWidgets } from "../../../../Treble/PlayerWidgets/PlayerWidgets";
export const CartForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { price } = useAppSelector(getSubtotal);
  const imageIndex = useAppSelector(getImageDefaultImageIndex);

  const handleOpenShare = () => dispatch(setIsShareOpen());
  const { canGoBack, setFormStepData, goToNextStep, goToPreviousStep } = useMultiStepFormContext();

  const { form, isLoading } = useMultiStepFormStepForm("cart");

  const submitHandler = form.handleSubmit((data) => {
    setFormStepData("cart", data);
    goToNextStep();
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className={s.wrap}>
      <div className={s.content}>
        <div className={s.playerWrap}>
          <PlayerLoader />
          <Player>
            <PlayerWidgets hideGallery />
          </Player>
          <PlayerImagePreview className={s.image} fromCartPage />
        </div>
        {/* <div className={s.footer}>
          <div className={s.subtotal}>Total: {price}</div>
          <Button variant="secondary" onClick={handleOpenShare} className={s.btnCheckout}>
            Save
          </Button>
        </div> */}
      </div>
      <SummaryList />
    </div>
  );
};
