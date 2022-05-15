import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard, IColumn } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalColumn.css';
//remove
import { setTempBoards, setTempColumns, TempBoards } from '../../../react/features/tempSlice';
import { TStore } from '../../../react/store';
//remove

interface IModalColumnProps {
  columnData: IColumn;
  boardData: IBoard;
  cancelModalState: () => void;
}

function ModalColumn(props: IModalColumnProps) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove
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
    const addColumn: IColumn = { ...props.columnData };
    addColumn.title = currentData.name;

    const index = tempState.boardsArray.findIndex((item) => props.boardData.id === item.id);
    const change: IBoard = JSON.parse(JSON.stringify(props.boardData));
    const newOrder = change.columns.length
      ? Math.max(...change.columns.map((item) => item.order)) + 1
      : 1;
    addColumn.order = newOrder;
    change.columns.push(addColumn);

    dispatch(setTempColumns([...tempState.columnsArray.slice(), addColumn]));
    dispatch(
      setTempBoards([
        ...tempState.boardsArray.slice(0, index),
        change,
        ...tempState.boardsArray.slice(index + 1),
      ])
    );

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
