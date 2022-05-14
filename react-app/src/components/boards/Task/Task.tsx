import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setAppBoards } from '../../../react/features/boardsSlice';
//import { tasksArray } from '../../../temporary/tempData';
import { IBoard, IColumn, ITask } from '../../../interface/interfaces';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';

//remove
import {
  setTempBoards,
  setTempColumns,
  setTempTasks,
  TempBoards,
} from '../../../react/features/tempSlice';
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
      const editBoard: IBoard = JSON.parse(
        JSON.stringify(
          tempState.boardsArray.find((item) => item.id === props.taskData.boardId) ||
            tempState.boardsArray[0]
        )
      );

      const editColumn: IColumn = JSON.parse(JSON.stringify(props.columnData));

      const indexT = tempState.tasksArray.findIndex((item) => props.taskData.id === item.id);

      const indexTC = editColumn.tasks.findIndex((item) => item.id === props.taskData.id);

      const indexC = tempState.columnsArray.findIndex(
        (item) => item.id === props.taskData.columnId
      );

      const columnTasks = [...editColumn.tasks];
      columnTasks.splice(indexTC, 1);
      editColumn.tasks = columnTasks;

      const indexB = tempState.boardsArray.findIndex((item) => item.id === props.taskData.boardId);

      const boardColumns = [...editBoard.columns];

      const indexCB = boardColumns.findIndex((item) => item.id === props.taskData.columnId);

      boardColumns.splice(indexCB, 1, editColumn);
      editBoard.columns = boardColumns;

      dispatch(
        setTempColumns([
          ...tempState.columnsArray.slice(0, indexC),
          editColumn,
          ...tempState.columnsArray.slice(indexC + 1),
        ])
      );

      dispatch(
        setTempBoards([
          ...tempState.boardsArray.slice(0, indexB),
          editBoard,
          ...tempState.boardsArray.slice(indexB + 1),
        ])
      );

      dispatch(
        setTempTasks([
          ...tempState.tasksArray.slice(0, indexT),
          ...tempState.tasksArray.slice(indexT + 1),
        ])
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
          columnData={props.columnData}
          cancelModalState={cancelModalState}
        />
      )}

      <p className="task__description">{props.taskData.description}</p>
    </article>
  );
}

export default Task;
