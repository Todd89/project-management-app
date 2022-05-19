import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IBoard, ITask } from '../../../interface/interfaces';
import './board.css';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ModalColumn from '../ModalColumn/ModalColumn';
import Column from '../Column/Column';

import {
  setCurrentBoard,
  DataBoards,
  getBoardByIdAPI,
  setIsChanged,
  updateBoard,
  dragAndDropTaskInColumnAPI,
  dragAndDropTaskBetweenColumnsAPI,
  deleteTaskAPI,
  updateTaskAPI,
  createNewTaskAPI,
} from '../../../react/features/dataSlice';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import HTTPClient from '../../../API/api';

interface IPropsBoard {
  boardData: IBoard;
}

function Board(props: IPropsBoard) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [isEditBoardModeOn, setIsEditBoardModeOn] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);
  const [currentBoardTitle, setCurrentBoardTitle] = useState('');

  const boardColumns = [...props.boardData.columns].sort((a, b) => a.order - b.order);

  useEffect(() => {
    setCurrentBoardTitle(dataState.currentBoard.title);
  }, [dataState.currentBoard.title]);

  function handleBoardClick() {
    dispatch(setCurrentBoard(props.boardData));
  }

  function handleHeaderStartEdit() {
    setIsEditBoardModeOn(true);
  }

  function handleHeaderEndEdit() {
    dispatch(
      updateBoard({
        token: loginState.token,
        boardId: props.boardData.id,
        boardTitle: currentBoardTitle,
      })
    );
    setIsEditBoardModeOn(false);
  }

  function handleKeyEvent(event: React.KeyboardEvent) {
    if (isEditBoardModeOn && event.key === 'Enter') {
      handleHeaderEndEdit();
    }
  }

  function handleHeaderEdit(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentBoardTitle(String(event.target.value));
  }

  useEffect(() => {
    if (dataState.isChanged) {
      dispatch(getBoardByIdAPI({ token: loginState.token, boardId: props.boardData.id }));
      dispatch(setIsChanged(false));
    }
  }, [loginState.token, dispatch, dataState.isChanged, props.boardData.id]);

  function handleColumnAdd() {
    setIsModalOn(true);
  }

  function cancelModalState() {
    setIsModalOn(false);
  }

  const token = useSelector((state: TStore) => state.loginData.token);

  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;
    HTTPClient.getTaskByID(
      loginState.token,
      dataState.currentBoard.id,
      source.droppableId,
      draggableId
    ).then((response: ITask) => {
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;
      if (destination.droppableId === source.droppableId && destination.index !== source.index) {
        dispatch(
          dragAndDropTaskInColumnAPI({
            token: token,
            boardId: dataState.currentBoard.id,
            columnId: dataState.currentColumn.id,
            oldIndex: source.index,
            newIndex: destination.index,
          })
        );
      }
      if (destination.droppableId !== source.droppableId) {
        dispatch(
          dragAndDropTaskBetweenColumnsAPI({
            token: token,
            boardId: dataState.currentBoard.id,
            oldColumnId: source.droppableId,
            newColumnId: destination.droppableId,
            oldIndex: source.index,
            newIndex: destination.index,
            board: dataState.currentBoard,
          })
        );
      }
    });
    console.log('DropResult', result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <article className="board" onClick={handleBoardClick}>
        <div className="board__header">
          <nav className="column__nav">
            <ButtonAdd buttonText={t('Column.add')} handleAdd={handleColumnAdd} />
          </nav>
          {isEditBoardModeOn ? (
            <input
              type="text"
              className="board__name board-header-input"
              value={currentBoardTitle}
              autoFocus
              onChange={handleHeaderEdit}
              onBlur={handleHeaderEndEdit}
              onKeyDown={handleKeyEvent}
            />
          ) : (
            <span className="board__name board-header-text" onClick={handleHeaderStartEdit}>
              {currentBoardTitle}
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
          <ModalColumn boardData={props.boardData} cancelModalState={cancelModalState} />
        )}
      </article>
    </DragDropContext>
  );
}

export default Board;
