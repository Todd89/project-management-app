import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IAppUser, IColumn, ITaskInColumn, TUsers } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalTask.css';
import { DataBoards, createNewTaskAPI, updateTaskAPI } from '../../../react/features/dataSlice';
import { useTranslation } from 'react-i18next';

interface IModalTaskProps {
  taskData: ITaskInColumn;
  user: IAppUser;
  columnData: IColumn;
  isNewTask: boolean;
  cancelModalState: () => void;
}

function ModalTask(props: IModalTaskProps) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const usersState: TUsers = useSelector((state: TStore) => state.usersFunctions);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [isFinished, setIsFinished] = useState(false);

  let order = props.taskData.order;
  if (props.isNewTask) {
    order = props.columnData.tasks.length
      ? Math.max(...props.columnData.tasks.map((item) => item.order)) + 1
      : 1;
  }
  const [currentData, setCurrentData] = useState({
    title: props.taskData.title,
    description: props.taskData.description,
    order: order,
    user: props.user,
  });

  const userSelectOptions = usersState.usersArray.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      title: String(event.target.value),
      description: currentData.description,
      order: currentData.order,
      user: currentData.user,
    });
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      title: currentData.title,
      description: String(event.target.value),
      order: currentData.order,
      user: currentData.user,
    });
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedId = event.target.selectedOptions[0].value;
    const userInd = usersState.usersArray.findIndex((user) => user.id === selectedId);
    const taskUser = userInd >= 0 ? usersState.usersArray[userInd] : usersState.usersArray[0];

    setCurrentData({
      title: currentData.title,
      description: currentData.description,
      order: currentData.order,
      user: taskUser,
    });
  }

  useEffect(() => {}, [currentData]);

  function handleDataSave() {
    setIsFinished(true);
    props.cancelModalState();

    if (props.isNewTask) {
      dispatch(
        createNewTaskAPI({
          token: loginState.token,
          board: dataState.currentBoard,
          columnId: props.columnData.id,
          taskTitle: currentData.title,
          taskOrder: currentData.order,
          taskDescription: currentData.description !== '' ? currentData.description : ' ',
          userId: currentData.user.id,
        })
      );
    } else {
      dispatch(
        updateTaskAPI({
          token: loginState.token,
          boardId: dataState.currentBoard.id,
          columnId: props.columnData.id,
          taskId: props.taskData.id,
          taskTitle: currentData.title,
          taskOrder: currentData.order,
          taskDescription: currentData.description !== '' ? currentData.description : ' ',
          userId: currentData.user.id,
        })
      );
    }
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
            <span className="modal__task task-title">{t('Task.titleName')}</span>
            <input
              type="text"
              className="modal__task task-name"
              value={currentData.title}
              autoFocus
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
            <span className="modal__task task-title">{t('Task.titleDescription')}</span>
            <input
              type="text"
              className="modal__task task-misc"
              value={currentData.description}
              onChange={handleDescriptionChange}
              onKeyDown={handleKeyDown}
            />
            <span className="modal__task task-title">{t('Task.titleUser')}</span>
            <select value={currentData.user.id} onChange={handleUserChange}>
              {userSelectOptions}
            </select>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ModalTask;
