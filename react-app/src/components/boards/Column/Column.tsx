import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IColumn, IBoard, ITaskInColumn } from '../../../interface/interfaces';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import Task from '../Task/Task';
import ModalTask from '../ModalTask/ModalTask';
import './column.css';

import {
  setCurrentColumn,
  deleteColumnAPI,
  updateColumnAPI,
} from '../../../react/features/dataSlice';

interface IPropsColumn {
  columnData: IColumn;
  boardData: IBoard;
}

function Column(props: IPropsColumn) {
  const loginState = useSelector((state: TStore) => state.loginData);

  const [isEditColumnModeOn, setIsEditColumnModeOn] = useState(false);
  const [currentColumnTitle, setCurrentColumnTitle] = useState(props.columnData.title);
  const dispatch = useDispatch();

  const columnTasks = [...props.columnData.tasks].sort((a, b) => a.order - b.order);

  const [isModalOn, setIsModalOn] = useState(false);
  function cancelModalState() {
    setIsModalOn(false);
  }

  const currentUser = useSelector((state: TStore) => state.loginData);

  function handleColumnClick() {
    dispatch(setCurrentColumn(props.columnData));
  }

  function handleHeaderStartEdit() {
    setIsEditColumnModeOn(true);
  }

  function handleHeaderEndEdit() {
    dispatch(
      updateColumnAPI({
        token: loginState.token,
        boardId: props.boardData.id,
        columnId: props.columnData.id,
        columnTitle: currentColumnTitle,
        columnOrder: props.columnData.order,
      })
    );
    setIsEditColumnModeOn(false);
  }

  function handleKeyEvent(event: React.KeyboardEvent) {
    if (isEditColumnModeOn && event.key === 'Enter') {
      handleHeaderEndEdit();
    }
  }

  function handleHeaderEdit(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentColumnTitle(String(event.target.value));
  }

  const emptyTask: ITaskInColumn = {
    id: `new task`,
    title: '',
    order: 999,
    done: false,
    description: '',
    userId: currentUser.id,
    files: [],
  };

  function handleTaskAdd() {
    setIsModalOn(true);
  }

  function handleColumnDelete(answer: boolean) {
    if (answer) {
      dispatch(
        deleteColumnAPI({
          token: loginState.token,
          boardId: props.boardData.id,
          columnId: props.columnData.id,
        })
      );
    }
  }

  return (
    <article className="column" onClick={handleColumnClick}>
      <div className="column__header">
        <nav className="column__nav">
          <ButtonDelete confirmationText={currentColumnTitle} handleDelete={handleColumnDelete} />
        </nav>
        {isEditColumnModeOn ? (
          <input
            type="text"
            className="header-input"
            value={currentColumnTitle}
            autoFocus
            onChange={handleHeaderEdit}
            onBlur={handleHeaderEndEdit}
            onKeyDown={handleKeyEvent}
          />
        ) : (
          <p className="header-text" onClick={handleHeaderStartEdit}>
            {props.columnData.order}. {currentColumnTitle}
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
          isNewTask={true}
        />
      )}
    </article>
  );
}

export default Column;
