import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setAppBoards } from '../../../react/features/boardsSlice';
//import { tasksArray } from '../../../temporary/tempData';
import { IBoard, IColumn, ITask } from '../../../interface/interfaces';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalTask from '../ModalTask/ModalTask';
import './task.css';
import {
  setAppBoards,
  setAppColumns,
  setAppTasks,
  DataBoards,
} from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';

interface IPropsTask {
  columnData: IColumn;
  taskData: ITask;
}

function Task(props: IPropsTask) {
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const [isModalOn, setIsModalOn] = useState(false);
  const dispatch = useDispatch();

  function handleTaskDelete(answer: boolean) {
    if (answer) {
      const editBoard: IBoard = JSON.parse(
        JSON.stringify(
          dataState.boardsArray.find((item) => item.id === props.taskData.boardId) ||
            dataState.boardsArray[0]
        )
      );
      /*temp
      const editColumn: IColumn = JSON.parse(JSON.stringify(props.columnData));

      const indexT = dataState.tasksArray.findIndex((item) => props.taskData.id === item.id);

      const indexTC = editColumn.tasks.findIndex((item) => item.id === props.taskData.id);

      const indexC = dataState.columnsArray.findIndex(
        (item) => item.id === props.taskData.columnId
      );

      const columnTasks = [...editColumn.tasks];
      columnTasks.splice(indexTC, 1);
      editColumn.tasks = columnTasks;

      const indexB = dataState.boardsArray.findIndex((item) => item.id === props.taskData.boardId);

      const boardColumns = [...editBoard.columns];

      const indexCB = boardColumns.findIndex((item) => item.id === props.taskData.columnId);

      boardColumns.splice(indexCB, 1, editColumn);
      editBoard.columns = boardColumns;

      dispatch(
        setAppColumns([
          ...dataState.columnsArray.slice(0, indexC),
          editColumn,
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

      dispatch(
        setAppTasks([
          ...dataState.tasksArray.slice(0, indexT),
          ...dataState.tasksArray.slice(indexT + 1),
        ])
      );
temp*/
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
