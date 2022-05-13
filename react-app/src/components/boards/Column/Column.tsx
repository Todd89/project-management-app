import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setAppBoards } from '../../../react/features/boardsSlice';
import { setCurrentColumn } from '../../../react/features/columnsSlice';
import { TStore } from '../../../react/store';

import { ITask, IColumn, TColumns, IBoard } from '../../../interface/interfaces';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import Task from '../Task/Task';
import ModalTask from '../ModalTask/ModalTask';
import './column.css';
//remove
import {
  setTempBoards,
  setTempColumns,
  setTempTasks,
  TempBoards,
} from '../../../react/features/tempSlice';
//remove

interface IPropsColumn {
  columnData: IColumn;
  boardData: IBoard;
}

function Column(props: IPropsColumn) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove

  const [isEditColumnModeOn, setIsEditColumnModeOn] = useState(false);

  const tasksFromColumn = Array.from(props.columnData.tasks);
  const columnTasks: Array<ITask> = [];
  tasksFromColumn.forEach((tempTask) => {
    columnTasks.push(
      tempState.tasksArray.find((item) => item.id === tempTask.id) || tempState.tasksArray[0]
    );
  });
  columnTasks.sort((a, b) => a.order - b.order);

  const dispatch = useDispatch();
  const [isModalOn, setIsModalOn] = useState(false);
  function cancelModalState() {
    setIsModalOn(false);
  }

  const userState = useSelector((state: TStore) => state.usersFunctions);
  const columnState: TColumns = useSelector((state: TStore) => state.columnsFunctions);

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
    const index = tempState.columnsArray.findIndex(
      (item) => columnState.currentColumn.id === item.id
    );
    const change = JSON.parse(JSON.stringify(columnState.currentColumn));
    change.title = event.target.value;
    dispatch(
      setTempColumns([
        ...tempState.columnsArray.slice(0, index),
        change,
        ...tempState.columnsArray.slice(index + 1),
      ])
    );

    const indexB = tempState.boardsArray.findIndex((item) => props.boardData.id === item.id);
    const changeB: IBoard = JSON.parse(JSON.stringify(props.boardData));
    changeB.columns.forEach((item) => {
      if (item.id === props.columnData.id) {
        item.title = event.target.value;
      }
    });
    dispatch(
      setTempBoards([
        ...tempState.boardsArray.slice(0, indexB),
        changeB,
        ...tempState.boardsArray.slice(indexB + 1),
      ])
    );

    //dispatch(setAppBoards());
  }

  const emptyTask: ITask = {
    id: `task${String(tempState.tasksArray.length)}`,
    title: '',
    order: 999,
    description: '',
    userId: userState.currentUser.id,
    boardId: props.boardData.id,
    columnId: props.columnData.id,
  };

  function handleTaskAdd() {
    setIsModalOn(true);
  }

  function handleColumnDelete(answer: boolean) {
    if (answer) {
      const index = tempState.columnsArray.findIndex((item) => props.columnData.id === item.id);
      dispatch(
        setTempColumns([
          ...tempState.columnsArray.slice(0, index),
          ...tempState.columnsArray.slice(index + 1),
        ])
      );
      let ind = 0;
      while (ind < tempState.tasksArray.length) {
        if (tempState.tasksArray[ind].columnId === props.columnData.id) {
          dispatch(
            setTempTasks([
              ...tempState.tasksArray.slice(0, ind),
              ...tempState.tasksArray.slice(ind + 1),
            ])
          );
        } else {
          ind += 1;
        }
      }
      //dispatch(setAppBoards());
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
