import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IColumn, IBoard, ITaskInColumn, IAppUser, TUsers } from '../../../interface/interfaces';
import Task from '../Task/Task';
import ModalTask from '../ModalTask/ModalTask';
import './column.css';

import {
  setCurrentColumn,
  deleteColumnAPI,
  updateColumnAPI,
} from '../../../react/features/dataSlice';

import { useTranslation } from 'react-i18next';

interface IPropsColumn {
  columnData: IColumn;
  boardData: IBoard;
  index: number;
}
import ButtonAddTask from '../../pages/reusableComponents/buttonAddTask/buttonAddTask';
import ButtonDeleteInColumn from '../buttonDeleteInColumn/buttonDeleteInColumn';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Column(props: IPropsColumn) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const userState: TUsers = useSelector((state: TStore) => state.usersFunctions);
  const [isEditColumnModeOn, setIsEditColumnModeOn] = useState(false);
  const [currentColumnTitle, setCurrentColumnTitle] = useState(props.columnData.title);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [columnTasks, setColumnTasks] = useState<ITaskInColumn[]>();

  const [isModalOn, setIsModalOn] = useState(false);
  function cancelModalState() {
    setIsModalOn(false);
  }

  const currentUser = useSelector((state: TStore) => state.loginData);
  useEffect(() => {
    setColumnTasks([...props.columnData.tasks].sort((a, b) => a.order - b.order));
  }, [props.columnData]);
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
    <Draggable draggableId={props.columnData.id} key={props.columnData.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={`column-container ${snapshot.isDragging ? 'drag' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={props.columnData.id} type="tasks">
            {(provided, snapshot) => (
              <article
                className={`column ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                onClick={handleColumnClick}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="column__header">
                  <nav className="column__nav">
                    <ButtonDeleteInColumn
                      confirmationText={currentColumnTitle}
                      handleDelete={handleColumnDelete}
                    />
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
                      {currentColumnTitle}
                    </p>
                  )}
                </div>
                <div className="column__wrapper">
                  <div className="column__tasks">
                    {columnTasks &&
                      columnTasks.map((task, index) => {
                        return (
                          <Task
                            index={index}
                            key={task.id}
                            taskData={task}
                            columnData={props.columnData}
                          />
                        );
                      })}
                    {provided.placeholder}
                  </div>
                </div>
                <ButtonAddTask buttonText={t('Task.add')} handleAdd={handleTaskAdd} />
                {isModalOn && (
                  <ModalTask
                    taskData={emptyTask}
                    user={
                      userState.usersArray.find((user: IAppUser) => user.id === currentUser.id) ||
                      userState.usersArray[0]
                    }
                    columnData={props.columnData}
                    cancelModalState={cancelModalState}
                    isNewTask={true}
                  />
                )}
              </article>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
export default Column;
