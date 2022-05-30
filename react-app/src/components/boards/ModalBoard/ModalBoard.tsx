import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalBoard.css';
import { createNewBoardAPI, DataBoards } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import { useTranslation } from 'react-i18next';

interface IModalBoardProps {
  boardData: IBoard;
  cancelModalState: () => void;
}

function ModalBoard(props: IModalBoardProps) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const [currentData, setCurrentData] = useState({
    name: props.boardData.title,
  });
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      name: event.target.value,
    });
  }

  function handleDataSave() {
    props.cancelModalState();
    dispatch(createNewBoardAPI({ token: loginState.token, board: { title: currentData.name } }));
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleDataSave();
    }
  }

  return (
    <div
      className="blur"
      onClick={(event: React.MouseEvent) => {
        props.cancelModalState();
        event.stopPropagation();
      }}
    >
      <div
        className="modal"
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <div className="wrapper outside">
          <ButtonSave handleSave={handleDataSave} />
          <article className="modal__board">
            <span className="modal__board board-title">{t('Board.titleName')}</span>
            <input
              type="text"
              className="modal__board board-name"
              value={currentData.name}
              autoFocus
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

export default ModalBoard;
