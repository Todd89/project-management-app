import React from 'react';
import './buttonAddColumn.css';

interface IButtonAddProps {
  buttonText: string;
  handleAdd: () => void;
}

function ButtonAddColumn(props: IButtonAddProps) {
  return (
    <button className="button-add-column" onClick={props.handleAdd}>
      {props.buttonText}
    </button>
  );
}

export default ButtonAddColumn;
