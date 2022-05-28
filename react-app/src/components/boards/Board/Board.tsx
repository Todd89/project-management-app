import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IBoard, ITask, IColumn, ITaskInColumn } from '../../../interface/interfaces';
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
} from '../../../react/features/dataSlice';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
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
  const [changeColumns, setChangeColumns] = useState<IColumn[]>();
  const [boardColumns, setBoardColumns] = useState<IColumn[]>();
  const randomNumberForColumnOrder = Math.round(Math.random() * 1000000);
  const boardColumnsCopy: IColumn[] = JSON.parse(JSON.stringify(props.boardData.columns));
  const startBoardColumnsCopy = boardColumnsCopy.sort(
    (a: IColumn, b: IColumn) => a.order - b.order
  );

  useEffect(() => {
    setCurrentBoardTitle(dataState.currentBoard.title);
    setBoardColumns(changeColumns);
  }, [
    dataState.currentBoard.title,
    changeColumns,
    props.boardData,
    dataState.currentColumn,
    dataState.currentBoard,
    startBoardColumnsCopy,
  ]);

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
    console.log('result: DropResult', result);
    console.log('Исходные колонки boardColumnsCopy', boardColumnsCopy);
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    startBoardColumnsCopy.forEach((column: IColumn, index: number) => {
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
      console.log('+++++++++Drag-and-Drop внутри колонки');
      /*
      const draggedTask: ITaskInColumn[] = sourceColumn.tasks.filter((task) => {
        return task.id === draggableId;
      });
      */
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

      const sortColumnTasksAfterDnD = mapColumnTasksAfterDnD.sort(
        (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
      );

      const newDestinationColumn = {
        id: sourceColumn.id,
        order: sourceColumn.order,
        tasks: sortColumnTasksAfterDnD,
        title: sourceColumn.title,
      };

      const newBoardColumnsAfterDnD = startBoardColumnsCopy.map((column, index: number) => {
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
            taskOrder: index + randomNumberForColumnOrder,
            taskDescription: task.description,
            userId: task.userId,
          })
        );
      });
    }
    //++++++++++++++++++++++++++++++++++++++++++++
    //        Drag-and-Drop между колонками
    //+++++++++++++++++++++++++++++++++++++++++++
    if (destination.droppableId !== source.droppableId && type === 'tasks') {
      console.log('+++++++++  Drag-and-Drop между колонками');
      if (destination)
        httpClient
          .getTaskByID(token, dataState.currentBoard.id, source.droppableId, draggableId)
          .then((responseDragTask: ITask) => {
            console.log('Данные по пермещаемому таску responseDragTask', responseDragTask);
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

            dispatch(
              deleteTaskAPI({
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
                taskOrder: 11111111,
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
                    startBoardColumnsCopy[destinationColumnIndex].tasks.length
                  )
                    return getAllTasksForDnD();
                  else {
                    if (responseAllTasks) {
                      console.log('Колонка с тасками responseAllTasks', responseAllTasks);
                      const sortAllTasks = responseAllTasks.sort(
                        (a: ITask, b: ITask) => a.order - b.order
                      );
                      console.log('Отсортированная Колонка с тасками sortAllTasks', sortAllTasks);

                      const updateDraggedTask: ITaskInColumn = {
                        id: sortAllTasks[sortAllTasks.length - 1].id,
                        title: sortAllTasks[sortAllTasks.length - 1].title,
                        order: sortAllTasks[sortAllTasks.length - 1].order,
                        done: startBoardColumnsCopy[sourceColumnIndex].tasks[source.index].done,
                        description: sortAllTasks[sortAllTasks.length - 1].description,
                        userId: sortAllTasks[sortAllTasks.length - 1].userId,
                        files: startBoardColumnsCopy[sourceColumnIndex].tasks[source.index].files,
                      };
                      console.log('Созданный таск в колонку updateDraggedTask', updateDraggedTask);
                      sortSourceColumnTasks.splice(source.index, 1);
                      sortDestinationColumnTasks.splice(destination.index, 0, updateDraggedTask);
                      console.log(
                        'Колонка с созданным  таском sortDestinationColumnTasks',
                        sortDestinationColumnTasks
                      );
                      const mapSourceColumnTasksAfterDnD = sortSourceColumnTasks.map(
                        (task: ITaskInColumn, index: number) => {
                          return {
                            id: task.id,
                            title: task.title,
                            order: index + randomNumberForColumnOrder * 2,
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
                            order: index + randomNumberForColumnOrder * 3,
                            done: task.done,
                            description: task.description,
                            userId: task.userId,
                            files: task.files,
                          };
                        }
                      );

                      console.log(
                        'Колонка с удаленным таском mapSourceColumnTasksAfterDnD',
                        mapSourceColumnTasksAfterDnD
                      );
                      console.log(
                        'Колонка с вставленным ОБновленным таском mapDestinationColumnTasksAfterDnD',
                        mapDestinationColumnTasksAfterDnD
                      );

                      const sortSourceColumnTasksAfterDnD = mapSourceColumnTasksAfterDnD.sort(
                        (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
                      );
                      const sortDestinationColumnTasksAfterDnD =
                        mapDestinationColumnTasksAfterDnD.sort(
                          (a: ITaskInColumn, b: ITaskInColumn) => a.order - b.order
                        );

                      console.log(
                        'sortDestinationColumnTasksAfterDnD',
                        sortDestinationColumnTasksAfterDnD
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

                      const newBoardColumnsAfterDnD = startBoardColumnsCopy.map(
                        (column, index: number) => {
                          if (index === sourceColumnIndex) return newSourceColumn;
                          if (index === destinationColumnIndex) return newDestinationColumn;
                          return column;
                        }
                      );

                      const sortNewBoardColumnsAfterDnD = newBoardColumnsAfterDnD.sort(
                        (a: IColumn, b: IColumn) => a.order - b.order
                      );
                      console.log('sortNewBoardColumnsAfterDnD', sortNewBoardColumnsAfterDnD);
                      console.log(
                        'sortDestinationColumnTasksAfterDnD',
                        sortDestinationColumnTasksAfterDnD
                      );

                      sortDestinationColumnTasksAfterDnD.forEach(
                        (task: ITaskInColumn, index: number) => {
                          dispatch(
                            updateTaskAPI({
                              token: loginState.token,
                              boardId: props.boardData.id,
                              columnId: newDestinationColumn.id,
                              taskId: task.id,
                              taskTitle: task.title,
                              taskOrder: task.order,
                              taskDescription: task.description,
                              userId: task.userId,
                            })
                          );
                        }
                      );
                      setChangeColumns(sortNewBoardColumnsAfterDnD);
                    }
                  }
                });
            };
            getAllTasksForDnD();
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
      console.log('+++++++++  Drag-and-Drop КОЛОНОК');
      const boardColumnsBeforeDnD: IColumn[] = JSON.parse(JSON.stringify(startBoardColumnsCopy));
      const boardColumnsAfterDnD = boardColumnsBeforeDnD.sort(
        (a: IColumn, b: IColumn) => a.order - b.order
      );
      const draggedColumn = boardColumnsAfterDnD.splice(source.index, 1);
      boardColumnsAfterDnD.splice(destination.index, 0, draggedColumn[0]);

      console.log('boardColumnsAfterDnD', boardColumnsAfterDnD);

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
      setChangeColumns(mapBoardColumnsAfterDnD);
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
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
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
              <span className="board-header-text-name">Board name: </span>
              {currentBoardTitle}
            </span>
          )}
          <nav className="column__nav">
            <ButtonAddColumn buttonText={t('Column.add')} handleAdd={handleColumnAdd} />
          </nav>
        </div>
        <article className="board" onClick={handleBoardClick}>
          <div className="columns">
            <div className="columns__list">
              {boardColumns.map((column) => {
                return <Column key={column.id} columnData={column} boardData={props.boardData} />;
              })}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
