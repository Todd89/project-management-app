import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setAppBoards } from '../../../react/features/boardsSlice';
//import { tasksArray } from '../../../temporary/tempData';
import { IColumn, ITask } from '../../../interface/interfaces';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';

//remove
import { setTempTasks, TempBoards } from '../../../react/features/tempSlice';
import { TStore } from '../../../react/store';
//remove

interface IPropsTask {
  columnData: IColumn;
  taskData: ITask;
}

function Task(props: IPropsTask) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove
  const [isModalOn, setIsModalOn] = useState(false);
  const dispatch = useDispatch();

  function handleTaskDelete(answer: boolean) {
    if (answer) {
      const index = tempState.tasksArray.findIndex((item) => props.taskData.id === item.id);
      dispatch(
        setTempTasks([
          ...tempState.tasksArray.slice(0, index),
          ...tempState.tasksArray.slice(index + 1),
        ])
      );
      //dispatch(setAppBoards());
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
          columnData={props.columnData}
          cancelModalState={cancelModalState}
        />
      )}

      <p className="task__description">{props.taskData.description}</p>
    </article>
  );
}

export default Task;
