import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../react/store';
import { IBoard, IShortBoard } from '../../../interface/interfaces';
import Board from '../Board/Board';
import './boardList.css';
import ModalBoard from '../ModalBoard/ModalBoard';
import BoardButton from '../BoardButton/boardButton';
import {
  getAllBoardsFromAPI,
  setCurrentBoard,
  DataBoards,
  getBoardByIdAPI,
  setIsModalOn,
} from '../../../react/features/dataSlice';
import { getAllUsersApi } from '../../../react/features/usersSlice';
import { useTranslation } from 'react-i18next';

function BoardList() {
  const dispatch = useDispatch();
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const { t, i18n } = useTranslation();

  //const [isModalOn, setIsModalOn] = useState(false);
  const [isBoardChosen, setIsBoardChosen] = useState(false);

  useEffect(() => {
    if (loginState.token) {
      dispatch(getAllBoardsFromAPI(loginState.token));
      dispatch(getAllUsersApi(loginState.token));
    }
  }, [dispatch, loginState.token]);

  const emptyBoard: IBoard = {
    id: '',
    title: '',
    columns: [],
  };

  function cancelModalState() {
    dispatch(setIsModalOn(false));
  }

  function handleBoardChoice(board: IShortBoard) {
    setIsBoardChosen(true);
    dispatch(getBoardByIdAPI({ token: loginState.token, boardId: board.id }));
  }

  function handleReturnToBoardList() {
    setIsBoardChosen(false);
    dispatch(setCurrentBoard({ id: '', title: '', columns: [] }));
  }

  return (
    <>
      <section className="boards">
        {!isBoardChosen && (
          <>
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
            ></button>
            <Board boardData={dataState.currentBoard} />
          </>
        )}
        {dataState.isModalOn && (
          <ModalBoard boardData={emptyBoard} cancelModalState={cancelModalState} />
        )}
      </section>
    </>
  );
}

export default BoardList;
