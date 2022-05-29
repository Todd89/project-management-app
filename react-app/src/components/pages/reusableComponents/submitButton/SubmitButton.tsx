import { useTranslation } from 'react-i18next';
import './SubmitButton.css';

type SubmitButtonProps = {
  submitBtnDisabled: boolean;
};

const SubmitButton = ({ submitBtnDisabled }: SubmitButtonProps) => {
  const { t, i18n } = useTranslation();
  return (
    <button type="submit" className="submit-btn" disabled={submitBtnDisabled}>
      {t('Autho.send')}
    </button>
  );
};

export default SubmitButton;
