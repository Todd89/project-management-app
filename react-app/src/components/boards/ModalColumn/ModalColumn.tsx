import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard, IColumn } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalColumn.css';
import {
  setAppBoards,
  setAppColumns,
  DataBoards,
  createNewColumnAPI,
} from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import { INewColumn } from '../../../interface/types';

interface IModalColumnProps {
  columnData: IColumn;
  boardData: IBoard;
  cancelModalState: () => void;
}

function ModalColumn(props: IModalColumnProps) {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);

  const [currentData, setCurrentData] = useState({
    name: props.columnData.title,
  });

  const dispatch = useDispatch();

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      name: event.target.value,
    });
  }

  function handleDataSave() {
    /*  const addColumn: IColumn = { ...props.columnData };
    addColumn.title = currentData.name;

    const index = dataState.boardsArray.findIndex((item) => props.boardData.id === item.id);
    const change: IBoard = JSON.parse(JSON.stringify(props.boardData));
    const newOrder = change.columns.length
      ? Math.max(...change.columns.map((item) => item.order)) + 1
      : 1;
    addColumn.order = newOrder;
    change.columns.push(addColumn);*/

    /* const newOrder = dataState.columnsArray.filter(column=>column.boardId===props.boardData.id).length
      ? Math.max(...dataState.columnsArray.map((item) => item.order)) + 1
      : 1;*/

    const newOrder = props.boardData.columns.length
      ? Math.max(...props.boardData.columns.map((item) => item.order)) + 1
      : 1;

    dispatch(
      createNewColumnAPI({
        token: loginState.token,
        board: props.boardData,
        columnBody: { title: currentData.name, order: newOrder },
      })
    );

    /*  dispatch(setAppColumns([...dataState.columnsArray.slice(), addColumn]));
    dispatch(
      setAppBoards([
        ...dataState.boardsArray.slice(0, index),
        change,
        ...dataState.boardsArray.slice(index + 1),
      ])
    );
*/
    props.cancelModalState();
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
        className="modal"
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <div className="wrapper outside">
          <ButtonSave handleSave={handleDataSave} />
          <article className="modal__column">
            <span className="modal__column column-title">Column name</span>
            <input
              type="text"
              className="modal__column column-name"
              value={currentData.name}
              autoFocus
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

export default ModalColumn;
