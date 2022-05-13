import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setCurrentUser } from '../../../react/features/usersSlice';
//import { setAppBoards, setCurrentBoard } from '../../../react/features/boardsSlice';
import { setCurrentBoard } from '../../../react/features/boardsSlice';
import { TStore } from '../../../react/store';
import { IBoard, TBoards, TUsers } from '../../../interface/interfaces';
import Board from '../Board/Board';

import './boardList.css';

import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ModalBoard from '../ModalBoard/ModalBoard';
import BoardButton from '../BoardButton/boardButton';
//remove
import { TempBoards } from '../../../react/features/tempSlice';
//remove

function BoardList() {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);

  //remove

  const [isModalOn, setIsModalOn] = useState(false);
  const [isBoardChosen, setIsBoardChosen] = useState(false);
  const dispatch = useDispatch();
  // const usersState: TUsers = useSelector((state: TStore) => state.usersFunctions);
  const boardsState: TBoards = useSelector((state: TStore) => state.boardsFunctions);

  /*function handleUserChoice(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch(setCurrentUser((event.target as HTMLButtonElement).id));
  }*/

  const emptyBoard: IBoard = {
    id: `board${String(tempState.boardsArray.length)}`,
    title: '',
    columns: [],
  };

  function handleBoardAdd() {
    setIsModalOn(true);
  }

  function cancelModalState() {
    setIsModalOn(false);
  }

  function handleBoardChoice(board: IBoard) {
    dispatch(setCurrentBoard(board));
  }

  function handleReturnToBoardList() {
    setIsBoardChosen(false);
  }

  // console.log('boardList', tempState.boardsArray);

  /* useEffect(() => {
    dispatch(setAppBoards());
  }, [usersState.currentUser, dispatch]);*/

  useEffect(() => {
    if (boardsState.currentBoard.id) {
      setIsBoardChosen(true);
    }
  }, [boardsState.currentBoard]);

  return (
    <>
      <section className="boards">
        {!isBoardChosen && (
          <>
            <ButtonAdd buttonText={'Add board'} handleAdd={handleBoardAdd} />
            <div className="boards__list">
              {tempState.boardsArray.map((board) => {
                return (
                  <BoardButton
                    key={board.id}
                    boardData={board}
                    handleBoardChoice={handleBoardChoice}
                  />
                );
              })}
            </div>
          </>
        )}
        {isBoardChosen && (
          <>
            <button
              className="boards__list__button button-return"
              onClick={handleReturnToBoardList}
            >
              back to the board list
            </button>
            <Board key={boardsState.currentBoard.id} boardData={boardsState.currentBoard} />
          </>
        )}
        {isModalOn && <ModalBoard boardData={emptyBoard} cancelModalState={cancelModalState} />}
      </section>
    </>
  );
}

export default BoardList;
