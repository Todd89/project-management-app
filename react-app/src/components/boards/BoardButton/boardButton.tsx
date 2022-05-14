import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../../interface/interfaces';
import {
  setTempBoards,
  setTempColumns,
  setTempTasks,
  TempBoards,
} from '../../../react/features/tempSlice';
import { TStore } from '../../../react/store';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import './boardButton.css';

interface IBoardButtonProps {
  boardData: IBoard;
  handleBoardChoice: (board: IBoard) => void;
}

function BoardButton(props: IBoardButtonProps) {
  //remove
  const tempState: TempBoards = useSelector((state: TStore) => state.tempFunctions);
  //remove
  const dispatch = useDispatch();

  function handleBoardDelete(answer: boolean) {
    if (answer) {
      const leftTasks = tempState.tasksArray.filter((item) => item.boardId != props.boardData.id);

      const indexB = tempState.boardsArray.findIndex((item) => item.id === props.boardData.id);

      const columnIDs = props.boardData.columns.map((item) => item.id);

      const leftColumns = tempState.columnsArray.filter((item) => !columnIDs.includes(item.id));

      dispatch(setTempColumns(leftColumns));

      dispatch(
        setTempBoards([
          ...tempState.boardsArray.slice(0, indexB),
          ...tempState.boardsArray.slice(indexB + 1),
        ])
      );

      dispatch(setTempTasks(leftTasks));
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
