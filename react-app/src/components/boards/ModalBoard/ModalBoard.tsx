import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setAppBoards } from '../../../react/features/boardsSlice';
//import { boardsArray } from '../../../temporary/tempData';
import { IBoard } from '../../../interface/interfaces';
import ButtonSave from '../ButtonSave/ButtonSave';
import './modalBoard.css';

//remove
import { TempBoards } from '../../../react/features/tempSlice';
import { TStore } from '../../../react/store';
//remove

interface IModalBoardProps {
  boardData: IBoard;
  cancelModalState: () => void;
}

function ModalBoard(props: IModalBoardProps) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove
  const [currentData, setCurrentData] = useState({
    name: props.boardData.title,
  });

  //const dispatch = useDispatch();

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentData({
      name: event.target.value,
    });
  }

  function handleDataSave() {
    props.cancelModalState();
    const addBoard: IBoard = { ...props.boardData };
    addBoard.title = currentData.name;
    tempState.boardsArray.push(addBoard);
    //dispatch(setAppBoards());
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
          <article className="modal__board">
            <span className="modal__board board-title">Board name</span>
            <input
              type="text"
              className="modal__board board-name"
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

export default ModalBoard;
