import React from 'react';
import './CloseWindowButton.css';

type CloseButtonProps = {
  closeWindow: React.Dispatch<boolean>;
};

const CloseWindowButton = ({ closeWindow }: CloseButtonProps) => {
  const closeSignUpWindow = () => {
    closeWindow(true);
  };
  return (
    <button
      type="button"
      className="close-btn"
      onClick={() => {
        closeSignUpWindow();
      }}
    ></button>
  );
};

export default CloseWindowButton;
