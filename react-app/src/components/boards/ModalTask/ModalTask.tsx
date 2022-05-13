import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setAppBoards } from '../../../react/features/boardsSlice';
import { TStore } from '../../../react/store';
//import { boardsArray, columnsArray, tasksArray } from '../../../temporary/tempData';
import { IBoard, IColumn, ITask, ITaskInColumn, TUsers } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalTask.css';

//remove
import {
  setTempBoards,
  setTempColumns,
  setTempTasks,
  TempBoards,
} from '../../../react/features/tempSlice';
//remove

interface IModalTaskProps {
  taskData: ITask;
  columnData: IColumn;
  cancelModalState: () => void;
}

function ModalTask(props: IModalTaskProps) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);

  const userState: TUsers = useSelector((state: TStore) => state.usersFunctions);

  const [currentData, setCurrentData] = useState({
    name: props.taskData.title,
    description: props.taskData.description,
    user: userState.currentUser,
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
    props.cancelModalState();

    const index = tempState.tasksArray.findIndex((item) => props.taskData === item);
    let editTaskInColumn: ITaskInColumn;
    let editTask: ITask;

    if (index >= 0) {
      editTask = JSON.parse(JSON.stringify(props.taskData));
      editTask.title = currentData.name;
      editTask.description = currentData.description;
      editTask.userId = currentData.user.id;
      dispatch(
        setTempTasks([
          ...tempState.tasksArray.slice(0, index),
          editTask,
          ...tempState.tasksArray.slice(index + 1),
        ])
      );

      editTaskInColumn = {
        ...editTask,
        done: false,
        files: [],
      };
    } else {
      editTask = { ...props.taskData };
      editTask.title = currentData.name;
      editTask.description = currentData.description;
      editTask.userId = currentData.user.id;
      dispatch(setTempTasks([...tempState.tasksArray.slice(), editTask]));

      editTaskInColumn = {
        ...editTask,
        done: false,
        files: [],
      };
    }

    const editColumn: IColumn = JSON.parse(
      JSON.stringify(
        tempState.columnsArray.find((item) => item.id === editTask.columnId) ||
          tempState.columnsArray[0]
      )
    );

    const indexBB = tempState.columnsArray.findIndex((item) => item.id === editColumn.id);
    dispatch(
      setTempColumns([
        ...tempState.columnsArray.slice(0, indexBB),
        editColumn,
        ...tempState.columnsArray.slice(indexBB + 1),
      ])
    );

    const indexC = editColumn.tasks.findIndex((item) => item.id === editTask.id);
    const columnTasks = [...editColumn.tasks];

    if (indexC >= 0) {
      columnTasks.splice(indexC, 1, editTaskInColumn);
    } else {
      columnTasks.push(editTaskInColumn);
    }
    const order = 1;

    console.log(columnTasks);
    columnTasks.sort((a, b) => a.order - b.order);
    console.log('2', tempState.tasksArray);
    /*  columnTasks.forEach((task) => {
      if (task.order != order) {
        task.order = order;
        const index = tempState.tasksArray.findIndex((item) => item.id === task.id);
        const findTask = tempState.tasksArray.slice(index, index + 1)[0];
        const change = JSON.parse(JSON.stringify(findTask));
        change.order = order;
        dispatch(
          setTempTasks([
            ...tempState.tasksArray.slice(0, index),
            change,
            ...tempState.tasksArray.slice(index + 1),
          ])
        );
      }
      order += 1;
    });
    editColumn.tasks = columnTasks;
    */
    const indexB = tempState.boardsArray.findIndex((item) => item.id === editTask.boardId);
    const editBoard: IBoard = JSON.parse(
      JSON.stringify(
        tempState.boardsArray.find((item) => item.id === editTask.boardId) ||
          tempState.boardsArray[0]
      )
    );
    const indexCB = editBoard.columns.findIndex((item) => item.id === editTask.columnId);
    editBoard.columns.splice(indexCB, 1, editColumn);
    dispatch(
      setTempBoards([
        ...tempState.boardsArray.slice(0, indexB),
        editBoard,
        ...tempState.boardsArray.slice(indexB + 1),
      ])
    );

    //dispatch(setAppBoards());
  }

  useEffect(() => {
    console.log('useEffect', tempState.tasksArray);
  }, [tempState.tasksArray]);

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
