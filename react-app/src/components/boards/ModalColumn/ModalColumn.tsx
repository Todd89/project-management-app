import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalColumn.css';
import { createNewColumnAPI } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import { useTranslation } from 'react-i18next';

interface IModalColumnProps {
  boardData: IBoard;
  cancelModalState: () => void;
}

function ModalColumn(props: IModalColumnProps) {
  const loginState = useSelector((state: TStore) => state.loginData);

  const [currentTitle, setCurrentTitle] = useState('');
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentTitle(String(event.target.value));
  }

  function handleDataSave() {
    const newOrder = props.boardData.columns.length
      ? Math.max(...props.boardData.columns.map((item) => item.order)) + 1
      : 1;

    dispatch(
      createNewColumnAPI({
        token: loginState.token,
        board: props.boardData,
        columnBody: { title: currentTitle, order: newOrder },
      })
    );

    props.cancelModalState();
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
          <article className="modal__column">
            <span className="modal__column column-title">{t('Column.titleName')}</span>
            <input
              type="text"
              className="modal__column column-name"
              value={currentTitle}
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

export default ModalColumn;
