import { useState } from 'react';
import ModalDeleteConfirmation from '../ModalDeleteConfirmation/ModalDeleteConfirmation';
import './buttonDelete.css';

interface IButtonDeleteProps {
  confirmationText: string;
  handleDelete: (a: boolean) => void;
}

function ManageButtons(props: IButtonDeleteProps) {
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
      <button className="button-delete" onClick={handleConfirmation}></button>
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

export default ManageButtons;
