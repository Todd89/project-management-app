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
import { getAllUsersApi } from '../../../react/features/usersSlice';
import { useTranslation } from 'react-i18next';

function BoardList() {
  const dispatch = useDispatch();
  const loginState = useSelector((state: TStore) => state.loginData);
  const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);
  const { t, i18n } = useTranslation();

  const [isModalOn, setIsModalOn] = useState(false);
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
    dispatch(setCurrentBoard({ id: '', title: '', columns: [] }));
  }

  return (
    <>
      <section className="boards">
        {!isBoardChosen && (
          <>
            <ButtonAdd buttonText={t('Board.add')} handleAdd={handleBoardAdd} />
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
              {t('Board.back')}
            </button>
            <Board boardData={dataState.currentBoard} />
          </>
        )}
        {isModalOn && <ModalBoard boardData={emptyBoard} cancelModalState={cancelModalState} />}
      </section>
    </>
  );
}

export default BoardList;
