import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IBoard, IShortBoard } from '../../../interface/interfaces';
import Board from '../Board/Board';

import './boardList.css';

import ButtonAdd from '../ButtonAdd/ButtonAdd';
import ModalBoard from '../ModalBoard/ModalBoard';
import BoardButton from '../BoardButton/boardButton';
import {
  getAllBoardsFromAPI,
  setCurrentBoard,
  DataBoards,
  getBoardByIdAPI,
} from '../../../react/features/dataSlice';

function BoardList() {
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);

  const [isModalOn, setIsModalOn] = useState(false);
  const [isBoardChosen, setIsBoardChosen] = useState(false);
  const dispatch = useDispatch();
  dispatch(getAllBoardsFromAPI(loginState.token));

  const emptyBoard: IBoard = {
    id: `board${String(dataState.boardsArray.length)}`,
    title: '',
    columns: [],
  };

  function handleBoardAdd() {
    setIsModalOn(true);
  }

  function cancelModalState() {
    setIsModalOn(false);
  }

  function handleBoardChoice(board: IShortBoard) {
    setIsBoardChosen(true);
    dispatch(getBoardByIdAPI({ token: loginState.token, boardId: board.id }));
  }

  function handleReturnToBoardList() {
    setIsBoardChosen(false);
    console.log('handleReturnToBoardList');
    dispatch(setCurrentBoard({ id: '', title: '', columns: [] }));
  }

  /*useEffect(() => {
    if (dataState.currentBoard.id) {
      setIsBoardChosen(true);
    }
  }, [dataState.currentBoard]);
*/
  return (
    <>
      <section className="boards">
        {!isBoardChosen && (
          <>
            <ButtonAdd buttonText={'Add board'} handleAdd={handleBoardAdd} />
            <div className="boards__list">
              {dataState.boardsArray.map((board) => {
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
            <Board />
          </>
        )}
        {isModalOn && <ModalBoard boardData={emptyBoard} cancelModalState={cancelModalState} />}
      </section>
    </>
  );
}

export default BoardList;
