import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import {
  IBoard,
  ITask,
  IColumn,
  ITaskInColumn,
  IUpdateTaskAPI,
} from '../../../interface/interfaces';
import './board.css';
import ButtonAddColumn from '../../pages/reusableComponents/buttonAddColumn/buttonAddColumn';
import ModalColumn from '../ModalColumn/ModalColumn';
import Column from '../Column/Column';

import {
  setCurrentBoard,
  DataBoards,
  getBoardByIdAPI,
  setIsChanged,
  updateBoard,
  deleteTaskAPI,
  updateTaskAPI,
  createNewTaskAPI,
  updateColumnAPI,
  deleteTaskAPIwoUpdate,
  updateAllTaskAPI,
} from '../../../react/features/dataSlice';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import httpClient from '../../../API/api';
import { IUpdateTask } from '../../../interface/types';
import ButtonAdd from '../ButtonAdd/ButtonAdd';

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
  const [boardColumns, setBoardColumns] = useState<IColumn[]>();
  const randomNumberForColumnOrder = Math.round(Math.random() * 1000000);
  const boardColumnsCopy: IColumn[] = JSON.parse(JSON.stringify(props.boardData.columns));
  /*const startBoardColumnsCopy = boardColumnsCopy.sort(
    (a: IColumn, b: IColumn) => a.order - b.order
  );*/

  useEffect(() => {
    setCurrentBoardTitle(dataState.currentBoard.title);
  }, [dataState.currentBoard.title]);

  useEffect(() => {
    setBoardColumns([...props.boardData.columns].sort((a, b) => a.order - b.order));
  }, [props.boardData.columns]);

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
    const { draggableId, source, destination, type } = result;
    let sourceColumn: IColumn = { id: '', title: '', order: 0, tasks: [] };
    let sourceColumnIndex = 0;
    let destinationColumn: IColumn = { id: '', title: '', order: 0, tasks: [] };
    let destinationColumnIndex = 0;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    boardColumns?.forEach((column: IColumn, index: number) => {
      if (column.id === source.droppableId) {
        sourceColumn = JSON.parse(JSON.stringify(column));
        sourceColumnIndex = index;
      }
      if (destination && destination !== null && column.id === destination.droppableId) {
        destinationColumn = JSON.parse(JSON.stringify(column));
        destinationColumnIndex = index;
      }
    });

    //++++++++++++++++++++++++++++++++++++++++++++
    //        Drag-and-Drop внутри колонки
    //+++++++++++++++++++++++++++++++++++++++++++
    if (
      destination &&
      destination.droppableId === source.droppableId &&
      destination.index !== source.index &&
      type === 'tasks'
    ) {
      const columnTasksCopy: ITaskInColumn[] = JSON.parse(JSON.stringify(sourceColumn.tasks));

      const filterColumnTasksCopy = columnTasksCopy.sort(
        (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
      );

      const draggedTask = filterColumnTasksCopy.splice(source.index, 1);
      filterColumnTasksCopy.splice(destination.index, 0, draggedTask[0]);

      const mapColumnTasksAfterDnD = filterColumnTasksCopy.map(
        (task: ITaskInColumn, index: number) => {
          return {
            id: task.id,
            title: task.title,
            order: index + randomNumberForColumnOrder,
            done: task.done,
            description: task.description,
            userId: task.userId,
            files: task.files,
          };
        }
      );

      const arrUpdate: Array<IUpdateTaskAPI> = [];
      mapColumnTasksAfterDnD.forEach((task: ITaskInColumn, index: number) => {
        arrUpdate.push({
          token: loginState.token,
          boardId: props.boardData.id,
          columnId: destinationColumn.id,
          taskId: task.id,
          taskTitle: task.title,
          taskOrder: task.order,
          taskDescription: task.description,
          userId: task.userId,
        });
      });

      dispatch(updateAllTaskAPI({ tasksArray: arrUpdate }));
    }

    //++++++++++++++++++++++++++++++++++++++++++++
    //        Drag-and-Drop между колонками
    //+++++++++++++++++++++++++++++++++++++++++++
    if (destination.droppableId !== source.droppableId && type === 'tasks') {
      if (destination)
        httpClient
          .getTaskByID(token, dataState.currentBoard.id, source.droppableId, draggableId)
          .then((responseDragTask: ITask) => {
            const sourceColumnTasks: ITaskInColumn[] = JSON.parse(
              JSON.stringify(sourceColumn.tasks)
            );
            const sortSourceColumnTasks = sourceColumnTasks.sort(
              (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
            );

            const destinationColumnTasks: ITaskInColumn[] = JSON.parse(
              JSON.stringify(destinationColumn.tasks)
            );
            const sortDestinationColumnTasks = destinationColumnTasks.sort(
              (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
            );

            let currentOrder = destination.index === 0 ? 0 : -1;

            const mapColumnTasksAfterDnD = sortDestinationColumnTasks.map(
              (task: ITaskInColumn, index: number) => {
                if (currentOrder + 1 === destination.index) {
                  currentOrder += 2;
                } else {
                  currentOrder += 1;
                }
                return {
                  id: task.id,
                  title: task.title,
                  order: currentOrder,
                  done: task.done,
                  description: task.description,
                  userId: task.userId,
                  files: task.files,
                };
              }
            );
            mapColumnTasksAfterDnD.forEach((task: ITaskInColumn, index: number) => {
              dispatch(
                updateTaskAPI({
                  token: loginState.token,
                  boardId: props.boardData.id,
                  columnId: destinationColumn.id,
                  taskId: task.id,
                  taskTitle: task.title,
                  taskOrder: task.order,
                  taskDescription: task.description,
                  userId: task.userId,
                })
              );
            });

            dispatch(
              deleteTaskAPIwoUpdate({
                token: token,
                boardId: props.boardData.id,
                columnId: sourceColumn.id,
                taskId: draggableId,
              })
            );
            dispatch(
              createNewTaskAPI({
                token: token,
                board: props.boardData,
                columnId: destinationColumn.id,
                taskTitle: responseDragTask.title,
                taskOrder: destination.index,
                taskDescription: responseDragTask.description,
                userId: loginState.id,
              })
            );
          });
    }
    //++++++++++++++++++++++++++++++++++++++++++++
    //        Drag-and-Drop колонок
    //+++++++++++++++++++++++++++++++++++++++++++
    if (
      destination &&
      destination.droppableId === source.droppableId &&
      destination.index !== source.index &&
      type === 'columns'
    ) {
      const boardColumnsBeforeDnD: IColumn[] = JSON.parse(JSON.stringify(boardColumns));
      const boardColumnsAfterDnD = boardColumnsBeforeDnD.sort(
        (a: IColumn, b: IColumn) => a.order - b.order
      );
      const draggedColumn = boardColumnsAfterDnD.splice(source.index, 1);
      boardColumnsAfterDnD.splice(destination.index, 0, draggedColumn[0]);

      const mapBoardColumnsAfterDnD: IColumn[] = boardColumnsAfterDnD.map(
        (column: IColumn, index: number) => {
          return {
            id: column.id,
            order: index + randomNumberForColumnOrder,
            tasks: column.tasks,
            title: column.title,
          };
        }
      );
      mapBoardColumnsAfterDnD.forEach((column: IColumn, index: number) => {
        dispatch(
          updateColumnAPI({
            token: token,
            boardId: dataState.currentBoard.id,
            columnId: column.id,
            columnTitle: column.title,
            columnOrder: column.order,
          })
        );
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={props.boardData.id}
        key={props.boardData.id}
        direction="horizontal"
        type="columns"
      >
        {(provided) => (
          <div className="board-container" ref={provided.innerRef} {...provided.droppableProps}>
            <article className="board" onClick={handleBoardClick}>
              <div className="board__header">
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
                    <span className="board-header-text-name">{t('Board.name')}: </span>
                    {currentBoardTitle}
                  </span>
                )}
                <nav className="column__nav">
                  <ButtonAddColumn buttonText={t('Column.add')} handleAdd={handleColumnAdd} />
                </nav>
              </div>

              <div className="columns">
                <div className="columns__list">
                  {boardColumns?.map((column, index) => {
                    return (
                      <Column
                        key={column.id}
                        columnData={column}
                        boardData={props.boardData}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
              {isModalOn && (
                <ModalColumn boardData={props.boardData} cancelModalState={cancelModalState} />
              )}
            </article>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
