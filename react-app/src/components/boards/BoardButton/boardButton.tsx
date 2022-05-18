import { useDispatch, useSelector } from 'react-redux';
import { IShortBoard } from '../../../interface/interfaces';
import { deleteAllBoardColumns } from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import './boardButton.css';

interface IBoardButtonProps {
  boardData: IShortBoard;
  handleBoardChoice: (board: IShortBoard) => void;
}

function BoardButton(props: IBoardButtonProps) {
  const loginState = useSelector((state: TStore) => state.loginData);

  const dispatch = useDispatch();

  function handleBoardDelete(answer: boolean) {
    if (answer) {
      dispatch(deleteAllBoardColumns({ token: loginState.token, boardId: props.boardData.id }));
    }
  }

  return (
    <article className="board-button" onClick={() => props.handleBoardChoice(props.boardData)}>
      <ButtonDelete confirmationText={props.boardData.title} handleDelete={handleBoardDelete} />
      <button className="board-button__button">{props.boardData.title}</button>
    </article>
  );
}

export default BoardButton;
