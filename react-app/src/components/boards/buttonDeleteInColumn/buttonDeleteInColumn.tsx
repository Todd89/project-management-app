import { useState } from 'react';
import ModalDeleteConfirmation from '../ModalDeleteConfirmation/ModalDeleteConfirmation';
import './buttonDeleteInColumn.css';

interface IButtonDeleteProps {
  confirmationText: string;
  handleDelete: (a: boolean) => void;
}

function ButtonDeleteInColumn(props: IButtonDeleteProps) {
  const [isModalOnD, setIsModalOnD] = useState(false);

  function handleConfirmation(event: React.MouseEvent) {
    event.stopPropagation();
    setIsModalOnD(true);
  }

  function cancelModalState() {
    setIsModalOnD(false);
  }

  return (
    <>
      <button className="button-delete-column" onClick={handleConfirmation}></button>
      {isModalOnD && (
        <ModalDeleteConfirmation
          confirmationText={props.confirmationText}
          handleConfirmation={props.handleDelete}
          cancelModalState={cancelModalState}
        />
      )}
    </>
  );
}

export default ButtonDeleteInColumn;
