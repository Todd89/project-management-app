import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IColumn, ITaskInColumn, TUsers } from '../../../interface/interfaces';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';
import { DataBoards, deleteTaskAPI } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import { Draggable } from 'react-beautiful-dnd';
import ButtonDeleteInColumn from '../buttonDeleteInColumn/buttonDeleteInColumn';
import { useTranslation } from 'react-i18next';

interface IPropsTask {
  index: number;
  columnData: IColumn;
  taskData: ITaskInColumn;
}

function Task(props: IPropsTask) {
  const { t, i18n } = useTranslation();
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const userState: TUsers = useSelector((state: TStore) => state.usersFunctions);
  const [isModalOn, setIsModalOn] = useState(false);

  const dispatch = useDispatch();
  const userInd = userState.usersArray.findIndex((user) => user.id === props.taskData.userId);
  const taskUser = userInd >= 0 ? userState.usersArray[userInd] : userState.usersArray[0];

  function handleTaskDelete(answer: boolean) {
    if (answer) {
      dispatch(
        deleteTaskAPI({
          token: loginState.token,
          boardId: dataState.currentBoard.id,
          columnId: props.columnData.id,
          taskId: props.taskData.id,
        })
      );
    }
  }

  function handleTaskChange() {
    setIsModalOn(true);
  }

  function cancelModalState() {
    setIsModalOn(false);
  }

  return (
    <Draggable draggableId={props.taskData.id} key={props.taskData.id} index={props.index}>
      {(provided, snapshot) => (
        <article
          className={`task ${snapshot.isDragging ? 'drag' : ''}`}
          onClick={handleTaskChange}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ButtonDeleteInColumn
            confirmationText={props.taskData.title}
            handleDelete={handleTaskDelete}
          />
          <div className="task__header-task-block">
            <p className="task__header header-text">{props.taskData.title}</p>
            {isModalOn && (
              <ModalTask
                taskData={props.taskData}
                user={taskUser}
                columnData={props.columnData}
                cancelModalState={cancelModalState}
                isNewTask={false}
              />
            )}
            <p className="task__description">{props.taskData.description}</p>
            <p className="task__user">
              {t('Task.titleUser')}: {taskUser.name}
            </p>
          </div>
        </article>
      )}
    </Draggable>
  );
}

export default Task;
