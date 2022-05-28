import React from 'react';
import './buttonAddTask.css';

interface IButtonAddProps {
  buttonText: string;
  handleAdd: () => void;
}

function ButtonAddTask(props: IButtonAddProps) {
  return (
    <button className="button-add-task" onClick={props.handleAdd}>
      {props.buttonText}
    </button>
  );
}

export default ButtonAddTask;
