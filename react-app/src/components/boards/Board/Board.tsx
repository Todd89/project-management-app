import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setCurrentBoard } from '../../../react/features/boardsSlice';
import { TStore } from '../../../react/store';
import { IColumn } from '../../../interface/interfaces';
import './board.css';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ModalColumn from '../ModalColumn/ModalColumn';
import Column from '../Column/Column';

import {
  setAppBoards,
  setCurrentBoard,
  DataBoards,
  getBoardByIdAPI,
  setIsChanged,
} from '../../../react/features/dataSlice';

function Board() {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const dispatch = useDispatch();

  const [isEditBoardModeOn, setIsEditBoardModeOn] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  const boardColumns = [...dataState.currentBoard.columns].sort((a, b) => a.order - b.order);

  function handleBoardClick() {
    // console.log('handleBoardClick');
    dispatch(setCurrentBoard(dataState.currentBoard));
  }

  function handleHeaderStartEdit() {
    setIsEditBoardModeOn(true);
  }

  function handleHeaderEndEdit() {
    setIsEditBoardModeOn(false);
  }

  function handleKeyEvent(event: React.KeyboardEvent) {
    if (isEditBoardModeOn && event.key === 'Enter') {
      handleHeaderEndEdit();
    }
  }

  function handleHeaderEdit(event: React.ChangeEvent<HTMLInputElement>) {
    const index = dataState.boardsArray.findIndex((item) => dataState.currentBoard.id === item.id);
    const change = JSON.parse(JSON.stringify(dataState.currentBoard));
    change.title = event.target.value;
    dispatch(
      setAppBoards([
        ...dataState.boardsArray.slice(0, index),
        change,
        ...dataState.boardsArray.slice(index + 1),
      ])
    );
  }

  useEffect(() => {
    if (dataState.currentBoard.id !== '' && dataState.isChanged) {
      dispatch(getBoardByIdAPI({ token: loginState.token, boardId: dataState.currentBoard.id }));
      dispatch(setIsChanged(false));
    }
  }, [dataState.currentBoard, loginState.token, dispatch, dataState.isChanged]);

  const emptyColumn: IColumn = {
    id: `column${String(dataState.columnsArray.length)}`,
    title: '',
    order: 999,
    tasks: [],
  };

  function handleColumnAdd() {
    setIsModalOn(true);
  }

  function cancelModalState() {
    setIsModalOn(false);
  }

  return (
    <>
      <article className="board" onClick={handleBoardClick}>
        <div className="board__header">
          <nav className="column__nav">
            <ButtonAdd buttonText={'Add column'} handleAdd={handleColumnAdd} />
          </nav>
          {isEditBoardModeOn ? (
            <input
              type="text"
              className="board__name board-header-input"
              value={dataState.currentBoard.title}
              autoFocus
              onChange={handleHeaderEdit}
              onBlur={handleHeaderEndEdit}
              onKeyDown={handleKeyEvent}
            />
          ) : (
            <span className="board__name board-header-text" onClick={handleHeaderStartEdit}>
              {dataState.currentBoard.title}
            </span>
          )}
        </div>

        <div className="columns">
          <div className="columns__list">
            {boardColumns.map((column) => {
              return (
                <Column key={column.id} columnData={column} boardData={dataState.currentBoard} />
              );
            })}
          </div>
        </div>
        {isModalOn && (
          <ModalColumn
            columnData={emptyColumn}
            boardData={dataState.currentBoard}
            cancelModalState={cancelModalState}
          />
        )}
      </article>
    </>
  );
}

export default Board;
