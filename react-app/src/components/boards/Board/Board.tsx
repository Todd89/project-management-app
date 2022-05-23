import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IBoard, ITask, IColumn, ITaskInColumn } from '../../../interface/interfaces';
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
  deleteTaskAPI,
  updateTaskAPI,
  createNewTaskAPI,
} from '../../../react/features/dataSlice';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import httpClient from '../../../API/api';

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

  const [boardColumns, setBoardColumns] = useState<IColumn[]>(props.boardData.columns);
  const [changeColumns, setChangeColumns] = useState<IColumn[]>();

  //const orderedBoardColumns = [...props.boardData.columns].sort((a, b) => a.order - b.order);

  useEffect(() => {
    setCurrentBoardTitle(dataState.currentBoard.title);
    setBoardColumns(changeColumns ?? props.boardData.columns);
  }, [dataState.currentBoard.title, changeColumns, props.boardData]);

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
    let sourceColumn: IColumn = { id: '', title: '', order: 0, tasks: [] };
    let sourceColumnIndex = 0;
    let destinationColumn: IColumn = { id: '', title: '', order: 0, tasks: [] };
    let destinationColumnIndex = 0;
    const boardColumnsCopy: IColumn[] = JSON.parse(JSON.stringify([...boardColumns]));

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    boardColumnsCopy.forEach((column: IColumn, index: number) => {
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
      destination.index !== source.index
    ) {
      const draggedTask: ITaskInColumn[] = sourceColumn.tasks.filter((task) => {
        return task.id === draggableId;
      });
      const columnTasksCopy: ITaskInColumn[] = JSON.parse(JSON.stringify([...sourceColumn.tasks]));

      const filterColumnTasksCopy = columnTasksCopy.sort(
        (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
      );

      if (source.index > destination.index) {
        filterColumnTasksCopy.splice(source.index, 1);
        filterColumnTasksCopy.splice(destination.index, 0, draggedTask[0]);
      }

      if (source.index < destination.index) {
        filterColumnTasksCopy.splice(source.index, 1);
        filterColumnTasksCopy.splice(destination.index, 0, draggedTask[0]);
      }

      const mapColumnTasksAfterDnD = filterColumnTasksCopy.map(
        (task: ITaskInColumn, index: number) => {
          return {
            id: task.id,
            title: task.title,
            order: index + 1,
            done: task.done,
            description: task.description,
            userId: task.userId,
            files: task.files,
          };
        }
      );

      const sortColumnTasksAfterDnD = mapColumnTasksAfterDnD.sort(
        (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
      );

      const newDestinationColumn = {
        id: sourceColumn.id,
        order: sourceColumn.order,
        tasks: sortColumnTasksAfterDnD,
        title: sourceColumn.title,
      };

      const newBoardColumnsAfterDnD = boardColumnsCopy.map((column, index: number) => {
        return index === destinationColumnIndex ? newDestinationColumn : column;
      });

      const sortNewBoardColumnsAfterDnD = newBoardColumnsAfterDnD.sort(
        (a: IColumn, b: IColumn) => a.order - b.order
      );

      setChangeColumns(sortNewBoardColumnsAfterDnD);

      sortColumnTasksAfterDnD.forEach((task: ITaskInColumn, index: number) => {
        dispatch(
          updateTaskAPI({
            token: loginState.token,
            boardId: props.boardData.id,
            columnId: newDestinationColumn.id,
            taskId: task.id,
            taskTitle: task.title,
            taskOrder: index + 1,
            taskDescription: task.description,
            userId: task.userId,
          })
        );
      });
    }
    //++++++++++++++++++++++++++++++++++++++++++++
    //        Drag-and-Drop между колонками
    //+++++++++++++++++++++++++++++++++++++++++++
    if (destination.droppableId !== source.droppableId) {
      if (destination)
        httpClient
          .getTaskByID(loginState.token, dataState.currentBoard.id, source.droppableId, draggableId)
          .then((responseDragTask: ITask) => {
            const sourceColumnTasks: ITaskInColumn[] = JSON.parse(
              JSON.stringify([...sourceColumn.tasks])
            );
            const sortSourceColumnTasks = sourceColumnTasks.sort(
              (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
            );

            const destinationColumnTasks: ITaskInColumn[] = JSON.parse(
              JSON.stringify([...destinationColumn.tasks])
            );
            const sortDestinationColumnTasks = destinationColumnTasks.sort(
              (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
            );

            dispatch(
              deleteTaskAPI({
                token: loginState.token,
                boardId: props.boardData.id,
                columnId: sourceColumn.id,
                taskId: draggableId,
              })
            );
            dispatch(
              createNewTaskAPI({
                token: loginState.token,
                board: props.boardData,
                columnId: destinationColumn.id,
                taskTitle: responseDragTask.title,
                taskOrder: sortDestinationColumnTasks.length + 2,
                taskDescription: responseDragTask.description,
                userId: loginState.id,
              })
            );

            const getAllTasksForDnD = async () => {
              await httpClient
                .getAllTasks(loginState.token, dataState.currentBoard.id, destination.droppableId)
                .then((responseAllTasks: ITask[]) => {
                  if (
                    responseAllTasks.length ===
                    boardColumnsCopy[destinationColumnIndex].tasks.length
                  )
                    return getAllTasksForDnD();
                  else {
                    const sortAllTasks = responseAllTasks.sort(
                      (a: ITask, b: ITask) => a.order - b.order
                    );

                    const updateDraggedTask: ITaskInColumn = {
                      id: sortAllTasks[sortAllTasks.length - 1].id,
                      title: sortAllTasks[sortAllTasks.length - 1].title,
                      order: sortAllTasks[sortAllTasks.length - 1].order,
                      done: boardColumnsCopy[sourceColumnIndex].tasks[source.index].done,
                      description: sortAllTasks[sortAllTasks.length - 1].description,
                      userId: sortAllTasks[sortAllTasks.length - 1].userId,
                      files: boardColumnsCopy[sourceColumnIndex].tasks[source.index].files,
                    };
                    sortSourceColumnTasks.splice(source.index, 1);
                    sortDestinationColumnTasks.splice(destination.index, 0, updateDraggedTask);

                    const mapSourceColumnTasksAfterDnD = sortSourceColumnTasks.map(
                      (task: ITaskInColumn, index: number) => {
                        return {
                          id: task.id,
                          title: task.title,
                          order: index + 1,
                          done: task.done,
                          description: task.description,
                          userId: task.userId,
                          files: task.files,
                        };
                      }
                    );
                    const mapDestinationColumnTasksAfterDnD = sortDestinationColumnTasks.map(
                      (task: ITaskInColumn, index: number) => {
                        return {
                          id: task.id,
                          title: task.title,
                          order: index + 1,
                          done: task.done,
                          description: task.description,
                          userId: task.userId,
                          files: task.files,
                        };
                      }
                    );

                    const sortSourceColumnTasksAfterDnD = mapSourceColumnTasksAfterDnD.sort(
                      (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
                    );
                    const sortDestinationColumnTasksAfterDnD =
                      mapDestinationColumnTasksAfterDnD.sort(
                        (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
                      );

                    const newSourceColumn = {
                      id: sourceColumn.id,
                      order: sourceColumn.order,
                      tasks: sortSourceColumnTasksAfterDnD,
                      title: sourceColumn.title,
                    };
                    const newDestinationColumn = {
                      id: destinationColumn.id,
                      order: destinationColumn.order,
                      tasks: sortDestinationColumnTasksAfterDnD,
                      title: destinationColumn.title,
                    };

                    const newBoardColumnsAfterDnD = boardColumnsCopy.map(
                      (column, index: number) => {
                        if (index === sourceColumnIndex) return newSourceColumn;
                        if (index === destinationColumnIndex) return newDestinationColumn;
                        return column;
                      }
                    );

                    const sortNewBoardColumnsAfterDnD = newBoardColumnsAfterDnD.sort(
                      (a: IColumn, b: IColumn) => a.order - b.order
                    );

                    setChangeColumns(sortNewBoardColumnsAfterDnD);
                  }
                });
            };
            getAllTasksForDnD();
          });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
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
      </div>
    </DragDropContext>
  );
}

export default Board;
