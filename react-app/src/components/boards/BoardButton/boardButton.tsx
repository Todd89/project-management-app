import { IBoard } from '../../../interface/interfaces';
import './boardButton.css';

interface IBoardButtonProps {
  boardData: IBoard;
  handleBoardChoice: (board: IBoard) => void;
}

function BoardButton(props: IBoardButtonProps) {
  return (
    <button className="board-button" onClick={() => props.handleBoardChoice(props.boardData)}>
      {props.boardData.title}
    </button>
  );
}

export default BoardButton;
