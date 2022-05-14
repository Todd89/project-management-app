import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBoard } from '../../../react/features/boardsSlice';
import { TStore } from '../../../react/store';
import { IBoard, IColumn, TBoards } from '../../../interface/interfaces';
import './board.css';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ModalColumn from '../ModalColumn/ModalColumn';
import Column from '../Column/Column';
//remove
import { setTempBoards, TempBoards } from '../../../react/features/tempSlice';
//remove

interface IPropsBoard {
  boardData: IBoard;
}

function Board(props: IPropsBoard) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove

  const [isEditBoardModeOn, setIsEditBoardModeOn] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  const boardColumns = [...props.boardData.columns].sort((a, b) => a.order - b.order);

  const boardState: TBoards = useSelector((state: TStore) => state.boardsFunctions);

  const dispatch = useDispatch();

  function handleBoardClick() {
    dispatch(setCurrentBoard(props.boardData));
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
    const index = tempState.boardsArray.findIndex((item) => boardState.currentBoard.id === item.id);
    const change = JSON.parse(JSON.stringify(boardState.currentBoard));
    change.title = event.target.value;
    dispatch(
      setTempBoards([
        ...tempState.boardsArray.slice(0, index),
        change,
        ...tempState.boardsArray.slice(index + 1),
      ])
    );
  }

  useEffect(() => {
    dispatch(
      setCurrentBoard(
        tempState.boardsArray.find((board) => board.id === props.boardData.id) ||
          tempState.boardsArray[0]
      )
    );
  }, [dispatch, tempState.boardsArray, props.boardData.id]);

  const emptyColumn: IColumn = {
    id: `column${String(tempState.columnsArray.length)}`,
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
              value={props.boardData.title}
              autoFocus
              onChange={handleHeaderEdit}
              onBlur={handleHeaderEndEdit}
              onKeyDown={handleKeyEvent}
            />
          ) : (
            <span className="board__name board-header-text" onClick={handleHeaderStartEdit}>
              {props.boardData.title}
            </span>
          )}
        </div>

        <div className="columns">
          <div className="columns__list">
            {boardColumns.map((column) => {
              return <Column key={column.id} columnData={column} boardData={props.boardData} />;
            })}
          </div>
        </div>
        {isModalOn && (
          <ModalColumn
            columnData={emptyColumn}
            boardData={props.boardData}
            cancelModalState={cancelModalState}
          />
        )}
      </article>
    </>
  );
}

export default Board;
