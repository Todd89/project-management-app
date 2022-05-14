import React from 'react';
import './SubmitButton.css';

type SubmitButtonProps = {
  submitBtnDisabled: boolean;
};

const SubmitButton = ({ submitBtnDisabled }: SubmitButtonProps) => {
  return (
    <button type="submit" className="submit-btn" disabled={submitBtnDisabled}>
      Отправить
    </button>
  );
};

export default SubmitButton;
