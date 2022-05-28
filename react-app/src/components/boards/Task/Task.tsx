import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IColumn, ITaskInColumn, TUsers } from '../../../interface/interfaces';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';
import { DataBoards, deleteTaskAPI } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import { Draggable } from 'react-beautiful-dnd';

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
      {(provided) => (
        <article
          className="task"
          onClick={handleTaskChange}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ButtonDelete confirmationText={props.taskData.title} handleDelete={handleTaskDelete} />
          <p className="task__header header-text">
            {props.index + 1}. {props.taskData.title}
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
          <p className="task__description">{props.taskData.order}</p>
          <p className="task__user">{taskUser.name}</p>
        </article>
      )}
    </Draggable>
  );
}

export default Task;
