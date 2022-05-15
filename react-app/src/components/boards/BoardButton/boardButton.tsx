import { useDispatch, useSelector } from 'react-redux';
import { IBoard, IShortBoard } from '../../../interface/interfaces';
import {
  setAppBoards,
  setAppColumns,
  setAppTasks,
  DataBoards,
  getBoardColumnsFromAPI,
  deleteAllBoardColumns,
} from '../../../react/features/dataSlice';
import { TStore } from '../../../react/store';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import './boardButton.css';

interface IBoardButtonProps {
  boardData: IShortBoard;
  handleBoardChoice: (board: IShortBoard) => void;
}

function BoardButton(props: IBoardButtonProps) {
  const loginState = useSelector((state: TStore) => state.loginData);
  //const dataState: DataBoards = useSelector((state: TStore) => state.dataFunctions);

  const dispatch = useDispatch();

  function handleBoardDelete(answer: boolean) {
    if (answer) {
      // dispatch(getBoardColumnsFromAPI({ token: loginState.token, boardId: props.boardData.id }));
      dispatch(deleteAllBoardColumns({ token: loginState.token, boardId: props.boardData.id }));

      /*temp
      
      const leftTasks = dataState.tasksArray.filter((item) => item.boardId != props.boardData.id);
*/

      // const indexB = dataState.boardsArray.findIndex((item) => item.id === props.boardData.id);

      /*   const columnIDs =
        dataState.columnsArray
          .find((columnData) => columnData.boardId === props.boardData.id)
          ?.columns.map((item) => item.id) || [];
*/
      /*   const leftColumns = dataState.columnsArray.filter(
        (item) => props.boardData.id !== item.boardId
      );*/

      //  dispatch(setAppColumns(leftColumns));

      /*  dispatch(
        setAppBoards([
          ...dataState.boardsArray.slice(0, indexB),
          ...dataState.boardsArray.slice(indexB + 1),
        ])
      );*/

      //dispatch(setAppTasks(leftTasks));
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
