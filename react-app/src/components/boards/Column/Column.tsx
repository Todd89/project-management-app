import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setCurrentColumn } from '../../../react/features/columnsSlice';
import { TStore } from '../../../react/store';

import { ITask, IColumn, TColumns, IBoard } from '../../../interface/interfaces';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import Task from '../Task/Task';
import ModalTask from '../ModalTask/ModalTask';
import './column.css';

import {
  setAppBoards,
  setAppColumns,
  setCurrentColumn,
  setAppTasks,
  DataBoards,
  deleteColumnAPI,
} from '../../../react/features/dataSlice';

interface IPropsColumn {
  columnData: IColumn;
  boardData: IBoard;
}

function Column(props: IPropsColumn) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);

  const [isEditColumnModeOn, setIsEditColumnModeOn] = useState(false);

  const tasksFromColumnIds = Array.from(props.columnData.tasks).map((item) => item.id);

  const columnTasks = dataState.tasksArray
    .filter((item) => tasksFromColumnIds.includes(item.id))
    .sort((a, b) => a.order - b.order);

  const dispatch = useDispatch();
  const [isModalOn, setIsModalOn] = useState(false);
  function cancelModalState() {
    setIsModalOn(false);
  }

  const currentUser = useSelector((state: TStore) => state.loginData);
  //const columnState: TColumns = useSelector((state: TStore) => state.columnsFunctions);

  function handleColumnClick() {
    dispatch(setCurrentColumn(props.columnData));
  }

  function handleHeaderStartEdit() {
    setIsEditColumnModeOn(true);
  }

  function handleHeaderEndEdit() {
    setIsEditColumnModeOn(false);
  }

  function handleKeyEvent(event: React.KeyboardEvent) {
    if (isEditColumnModeOn && event.key === 'Enter') {
      handleHeaderEndEdit();
    }
  }

  function handleHeaderEdit(event: React.ChangeEvent<HTMLInputElement>) {
    /*temp
    const index = dataState.columnsArray.findIndex(
      (item) => columnState.currentColumn.id === item.id
    );
    const change = JSON.parse(JSON.stringify(columnState.currentColumn));
    change.title = event.target.value;
    dispatch(
      setAppColumns([
        ...dataState.columnsArray.slice(0, index),
        change,
        ...dataState.columnsArray.slice(index + 1),
      ])
    );

    const indexB = dataState.boardsArray.findIndex((item) => props.boardData.id === item.id);
    const changeB: IBoard = JSON.parse(JSON.stringify(props.boardData));
    changeB.columns.forEach((item) => {
      if (item.id === props.columnData.id) {
        item.title = event.target.value;
      }
    });
    dispatch(
      setAppBoards([
        ...dataState.boardsArray.slice(0, indexB),
        changeB,
        ...dataState.boardsArray.slice(indexB + 1),
      ])
    );
    temp*/
  }

  const emptyTask: ITask = {
    id: `task${String(dataState.tasksArray.length)}`,
    title: '',
    order: 999,
    description: '',
    userId: currentUser.id,
    boardId: props.boardData.id,
    columnId: props.columnData.id,
  };

  function handleTaskAdd() {
    setIsModalOn(true);
  }

  function handleColumnDelete(answer: boolean) {
    if (answer) {
      console.log('handleColumnDelete');
      dispatch(
        deleteColumnAPI({
          token: loginState.token,
          boardId: props.boardData.id,
          columnId: props.columnData.id,
        })
      );
      /*temp
      const leftTasks = dataState.tasksArray.filter((item) => item.columnId != props.columnData.id);

      const indexC = dataState.columnsArray.findIndex((item) => props.columnData.id === item.id);

      const indexB = dataState.boardsArray.findIndex((item) => item.id === props.boardData.id);
      const editBoard: IBoard = JSON.parse(JSON.stringify(props.boardData));

      const boardColumns = [...editBoard.columns];
      const indexCB = boardColumns.findIndex((item) => item.id === props.columnData.id);

      boardColumns.splice(indexCB, 1);
      editBoard.columns = boardColumns;

      dispatch(
        setAppColumns([
          ...dataState.columnsArray.slice(0, indexC),
          ...dataState.columnsArray.slice(indexC + 1),
        ])
      );

      dispatch(
        setAppBoards([
          ...dataState.boardsArray.slice(0, indexB),
          editBoard,
          ...dataState.boardsArray.slice(indexB + 1),
        ])
      );

      dispatch(setAppTasks(leftTasks));
          temp*/
    }
  }

  return (
    <article className="column" onClick={handleColumnClick}>
      <div className="column__header">
        <nav className="column__nav">
          <ButtonDelete
            confirmationText={props.columnData.title}
            handleDelete={handleColumnDelete}
          />
        </nav>
        {isEditColumnModeOn ? (
          <input
            type="text"
            className="header-input"
            value={props.columnData.title}
            autoFocus
            onChange={handleHeaderEdit}
            onBlur={handleHeaderEndEdit}
            onKeyDown={handleKeyEvent}
          />
        ) : (
          <p className="header-text" onClick={handleHeaderStartEdit}>
            {props.columnData.order}. {props.columnData.title}
          </p>
        )}
      </div>
      <div className="column__wrapper">
        <div className="column__tasks">
          {columnTasks.map((task) => {
            return <Task key={task.id} taskData={task} columnData={props.columnData} />;
          })}
        </div>
      </div>
      <ButtonAdd buttonText={'Add task'} handleAdd={handleTaskAdd} />
      {isModalOn && (
        <ModalTask
          taskData={emptyTask}
          columnData={props.columnData}
          cancelModalState={cancelModalState}
        />
      )}
    </article>
  );
}

export default Column;
