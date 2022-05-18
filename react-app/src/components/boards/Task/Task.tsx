import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IColumn, ITaskInColumn, TUsers } from '../../../interface/interfaces';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';
import { DataBoards, deleteTaskAPI } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';

interface IPropsTask {
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
    <article className="task" onClick={handleTaskChange}>
      <ButtonDelete confirmationText={props.taskData.title} handleDelete={handleTaskDelete} />
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
      <p className="task__user">{taskUser.name}</p>
    </article>
  );
}

export default Task;
