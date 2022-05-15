import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IBoard, IColumn, ITask, ITaskInColumn } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalTask.css';
import {
  setAppBoards,
  setAppColumns,
  setAppTasks,
  DataBoards,
} from '../../../react/features/dataSlice';

interface IModalTaskProps {
  taskData: ITask;
  columnData: IColumn;
  cancelModalState: () => void;
}

function ModalTask(props: IModalTaskProps) {
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);

  const usersState = useSelector((state: TStore) => state.loginData);

  const [currentData, setCurrentData] = useState({
    name: props.taskData.title,
    description: props.taskData.description,
    user: usersState,
  });

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      name: event.target.value,
      description: currentData.description,
      user: currentData.user,
    });
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      name: currentData.name,
      description: event.target.value,
      user: currentData.user,
    });
  }

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    //добавить выбор из списка пользователей
    setCurrentData({
      name: currentData.name,
      description: currentData.description,
      user: currentData.user,
    });
  }

  function handleDataSave() {
    setIsFinished(true);
    /*temp
    props.cancelModalState();

    const index = dataState.tasksArray.findIndex((item) => props.taskData === item);
    let editTaskInColumn: ITaskInColumn;
    let editTask: ITask;

    if (index >= 0) {
      editTask = JSON.parse(JSON.stringify(props.taskData));
      editTask.title = currentData.name;
      editTask.description = currentData.description;
      editTask.userId = currentData.user.id;

      editTaskInColumn = {
        ...editTask,
        done: false,
        files: [],
      };

      const editColumn: IColumn = JSON.parse(
        JSON.stringify(
          dataState.columnsArray.find((item) => item.id === editTask.columnId) ||
            dataState.columnsArray[0]
        )
      );

      const indexC = editColumn.tasks.findIndex((item) => item.id === editTask.id);
      const indexBB = dataState.columnsArray.findIndex((item) => item.id === editColumn.id);

      const columnTasks = [...editColumn.tasks];
      columnTasks.splice(indexC, 1, editTaskInColumn);
      editColumn.tasks = columnTasks;

      const indexB = dataState.boardsArray.findIndex((item) => item.id === editTask.boardId);
      const editBoard: IBoard = JSON.parse(
        JSON.stringify(
          dataState.boardsArray.find((item) => item.id === editTask.boardId) ||
            dataState.boardsArray[0]
        )
      );

      const boardColumns = [...editBoard.columns];

      const indexCB = boardColumns.findIndex((item) => item.id === editTask.columnId);

      boardColumns.splice(indexCB, 1, editColumn);
      editBoard.columns = boardColumns;

      dispatch(
        setAppTasks([
          ...dataState.tasksArray.slice(0, index),
          editTask,
          ...dataState.tasksArray.slice(index + 1),
        ])
      );

      dispatch(
        setAppColumns([
          ...dataState.columnsArray.slice(0, indexBB),
          editColumn,
          ...dataState.columnsArray.slice(indexBB + 1),
        ])
      );

      dispatch(
        setAppBoards([
          ...dataState.boardsArray.slice(0, indexB),
          editBoard,
          ...dataState.boardsArray.slice(indexB + 1),
        ])
      );
    } else {
      editTask = { ...props.taskData };
      editTask.title = currentData.name;
      editTask.description = currentData.description;
      editTask.userId = currentData.user.id;
      editTaskInColumn = {
        ...editTask,
        done: false,
        files: [],
      };

      const editColumn: IColumn = JSON.parse(
        JSON.stringify(
          dataState.columnsArray.find((item) => item.id === editTask.columnId) ||
            dataState.columnsArray[0]
        )
      );

      const indexBB = dataState.columnsArray.findIndex((item) => item.id === editColumn.id);

      const columnTasks = [...editColumn.tasks];
      const newOrder = columnTasks.length
        ? Math.max(...columnTasks.map((item) => item.order)) + 1
        : 1;
      editTaskInColumn.order = newOrder;
      editTask.order = newOrder;

      columnTasks.push(editTaskInColumn);
      editColumn.tasks = columnTasks;

      const indexB = dataState.boardsArray.findIndex((item) => item.id === editTask.boardId);
      const editBoard: IBoard = JSON.parse(
        JSON.stringify(
          dataState.boardsArray.find((item) => item.id === editTask.boardId) ||
            dataState.boardsArray[0]
        )
      );

      const boardColumns = [...editBoard.columns];
      const indexCB = boardColumns.findIndex((item) => item.id === editTask.columnId);

      boardColumns.splice(indexCB, 1, editColumn);
      editBoard.columns = boardColumns;

      dispatch(setAppTasks([...dataState.tasksArray.slice(), editTask]));

      dispatch(
        setAppColumns([
          ...dataState.columnsArray.slice(0, indexBB),
          editColumn,
          ...dataState.columnsArray.slice(indexBB + 1),
        ])
      );

      dispatch(
        setAppBoards([
          ...dataState.boardsArray.slice(0, indexB),
          editBoard,
          ...dataState.boardsArray.slice(indexB + 1),
        ])
      );
    }
    */
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleDataSave();
    }
  }

  return (
    <div
      className="blur"
      onClick={(event: React.MouseEvent) => {
        props.cancelModalState();
        event.stopPropagation();
      }}
    >
      <div
        className={isFinished ? 'modalT hide' : 'modalT'}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <div className="wrapper outside">
          <ButtonSave handleSave={handleDataSave} />
          <article className="modal__task">
            <span className="modal__task task-title">Task name</span>
            <input
              type="text"
              className="modal__task task-name"
              value={currentData.name}
              autoFocus
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
            <span className="modal__task task-title">Task description</span>
            <input
              type="text"
              className="modal__task task-misc"
              value={currentData.description}
              onChange={handleDescriptionChange}
              onKeyDown={handleKeyDown}
            />
            <span className="modal__task task-title">Task user</span>
            <input
              type="text"
              className="modal__task task-misc"
              value={currentData.user.name}
              onChange={handleUserChange}
              onKeyDown={handleKeyDown}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

export default ModalTask;
