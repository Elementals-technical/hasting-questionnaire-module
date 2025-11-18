import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import {
  getIframeAssetId,
  getImageDefaultImageIndex,
  getImagePreview,
  getIsChatOpen,
} from "../../../../../store/slices/configurator/selectors/selectors";

import { THREEKIT_ORG_ID, THREEKIT_PUBLIC_TOKEN } from "../../../../../utils/threekitUtils";
import Button from "../../../../Button/Button";
import FormConfigurator from "../../../../FormConfigurator/FormConfigurator";
import { PlayerLoader } from "../../../../Loader/PlayerLoader/PlayerLoader";
import { useMultiStepFormContext, useMultiStepFormStepForm } from "../../../../MultiStepForm/MultiStepFormContext";
import Player from "../../../../Treble/Player";
import { PlayerWidgets } from "../../../../Treble/PlayerWidgets/PlayerWidgets";
import ThreekitIframePlayer from "../../../../Treble/ThreekitPlayerIframe/ThreekitPlayerIframe";
import s from "./ConfiguratorStep.module.scss";
import { getSubtotal } from "../../../../../store/slices/product/selectors/selectors";
import { ChatWidget } from "../../../../AIChat/AiChat";
import { parsePrice } from "../../../../../utils/priceUtils";
import SummaryDetails from "../../../../SummaryDetails/SummaryDetails";
import ChevronTopIcon from "../../../../../assets/img/svg/ChevronTopIcon";
import PlayerImagePreview from "../../../../Treble/PlayerImagePreview/PlayerImagePreview";

export const ConfiguratorForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subtotal } = useAppSelector(getSubtotal);
  const assetId = useAppSelector(getIframeAssetId);
  const isChatOpen = useAppSelector(getIsChatOpen);
  const imagePreview = useAppSelector(getImagePreview);
  const imagePreviewIndex = useAppSelector(getImageDefaultImageIndex);
  const [isSummaryDetailsOpen, setIsSummaryDetailsOpen] = useState(false);
  const { canGoBack, setFormStepData, goToNextStep, goToPreviousStep } = useMultiStepFormContext();

  const { form, isLoading } = useMultiStepFormStepForm("configurator");

  const submitHandler = form.handleSubmit((data) => {
    setFormStepData("configurator", (data = { ...data, done: true }));
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
          <PlayerImagePreview />
          {!assetId && (
            <Player>
              <PlayerWidgets />
            </Player>
          )}
          {assetId && (
            <ThreekitIframePlayer
              className={s.player}
              assetId={assetId}
              orgId={THREEKIT_ORG_ID() || ""}
              publicToken={THREEKIT_PUBLIC_TOKEN() || ""}
              host="https://preview.threekit.com"
            />
          )}
        </div>
        <div className={s.footer}>
          <SummaryDetails isOpen={isSummaryDetailsOpen} onClose={() => setIsSummaryDetailsOpen(false)} />
          <Button
            iconBefore={<ChevronTopIcon />}
            className={s.subtotal}
            onClick={() => setIsSummaryDetailsOpen(!isSummaryDetailsOpen)}
            variant="secondary"
          >
            Total: {parsePrice(subtotal.reduce((acc, curr) => (acc += (curr?.price || 0) * curr.quantity), 0))}
          </Button>
          <Button variant="secondary" onClick={submitHandler} className={s.btnCheckout}>
            Go to checkout
          </Button>
        </div>
      </div>
      <div className={s.configurator}>{isChatOpen ? <ChatWidget /> : <FormConfigurator />}</div>
    </div>
  );
};
