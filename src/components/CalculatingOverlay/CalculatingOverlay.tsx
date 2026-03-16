import SmileIcon from '@/assets/icons/common/SmileIcon';
import { quotes } from '../../modules/Home/components/Questionnaire/steps/ProductsStep/constants';
import { QuoteRotator } from '../QuoteRotator/QuoteRotator';
import s from './CalculatingOverlay.module.scss';

const CalculatingOverlay = () => {
    return (
        <div className={s.overlay}>
            <div className={s.overlayTitle}>Calculating your results</div>
            <div className={s.loader} />
            <div className={s.overlaySubtitle}>Did you know?</div>
            <QuoteRotator quotes={quotes} />
            <SmileIcon />
        </div>
    );
};

export default CalculatingOverlay;
