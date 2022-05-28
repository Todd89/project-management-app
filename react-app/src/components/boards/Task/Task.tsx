import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IColumn, ITaskInColumn, TUsers } from '../../../interface/interfaces';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';
import { DataBoards, deleteTaskAPI } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import { Draggable } from 'react-beautiful-dnd';
import ButtonDeleteInColumn from '../buttonDeleteInColumn/buttonDeleteInColumn';

interface IPropsTask {
  index: number;
  columnData: IColumn;
  taskData: ITaskInColumn;
}

function Task(props: IPropsTask) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const userState: TUsers = useSelector((state: TStore) => state.usersFunctions);
  const [isModalOn, setIsModalOn] = useState(false);

  const dispatch = useDispatch();
  const taskUser =
    userState.usersArray.find((user) => user.id === props.taskData.userId) ||
    userState.usersArray[0];

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
    <Draggable draggableId={props.taskData.id.toString()} index={props.index}>
      {(provided) => (
        <article
          className="task"
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
            <p className="task__header header-text">
              {props.taskData.order}. {props.taskData.title}
            </p>
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
            {/* <p className="task__description">{props.taskData.order}</p> */}
            <p className="task__user">User: {taskUser.name}</p>
          </div>
        </article>
      )}
    </Draggable>
  );
}

export default Task;
