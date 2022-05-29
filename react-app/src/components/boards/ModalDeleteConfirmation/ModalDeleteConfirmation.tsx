import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CONFIRMATION_STATE } from '../../../constant/constant';
import './modalDeleteConfirmation.css';

interface IModalConfirmationProps {
  confirmationText: string;
  handleConfirmation: (answer: boolean) => void;
  cancelModalState: () => void;
}

function ModalDeleteConfirmation(props: IModalConfirmationProps) {
  const { t, i18n } = useTranslation();
  const [isClosing, setIsClosing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(CONFIRMATION_STATE.UNSET);

  useEffect(() => {
    if (isClosing) {
      if (isConfirmed === CONFIRMATION_STATE.YES) {
        props.handleConfirmation(true);
        props.cancelModalState();
      } else if (isConfirmed === CONFIRMATION_STATE.NO) {
        props.handleConfirmation(false);
        props.cancelModalState();
      }
    }
  }, [isClosing, isConfirmed, props]);

  return (
    <div
      className="blur"
      onClick={(event: React.MouseEvent) => {
        setIsClosing(true);
        setIsConfirmed(CONFIRMATION_STATE.NO);
        event.stopPropagation();
      }}
    >
      <div
        className={isClosing ? 'modalC hide' : 'modalC'}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <div className="wrapper outside">
          <span className="modalC__confirmation">
            {t('Modal.quastion')} &#34;{props.confirmationText}&#34;?
          </span>
          <div className="modalC__buttons">
            <button
              className="modalC__button"
              onClick={() => {
                setIsClosing(true);
                setIsConfirmed(CONFIRMATION_STATE.YES);
              }}
            >
              {t('Modal.yes')}
            </button>
            <button
              className="modalC__button"
              onClick={() => {
                setIsClosing(true);
                setIsConfirmed(CONFIRMATION_STATE.NO);
              }}
            >
              {t('Modal.no')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteConfirmation;
