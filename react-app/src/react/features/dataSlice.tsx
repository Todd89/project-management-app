import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../API/api';
import {
  IBoard,
  IColumn,
  ICreateBoard,
  ICreateColumn,
  ICreateTask,
  IDeleteBoard,
  IDeleteColumn,
  IDeleteTask,
  IGetBoard,
  IGetBoardColumns,
  IGetTasks,
  IShortBoard,
  ITask,
  ITempColumn,
  IUpdateBoard,
  IUpdateColumn,
  IUpdateTask,
  IGetTasksForDNDinColumn,
  IGetTasksForDNDinTwoColumns,
} from '../../interface/interfaces';

export interface DataBoards {
  boardsArray: Array<IShortBoard>;
  currentBoard: IBoard;
  columnsArray: Array<ITempColumn>;
  currentColumn: IColumn;
  tasksArray: Array<ITask>;
  isChanged: boolean;
  isModalOn: boolean;
}

export const initialState: DataBoards = {
  boardsArray: [],
  currentBoard: { id: '', title: '', columns: [] },
  columnsArray: [],
  currentColumn: { id: '', title: '', order: 0, tasks: [] },
  tasksArray: [],
  isChanged: false,
  isModalOn: false,
};

export const getAllBoardsFromAPI = createAsyncThunk(
  'getAllBoardsFromAPI',
  async (token: string, { dispatch }) => {
    const boardsAPI = await httpClient.getAllBoards(token);
    if (boardsAPI) {
      dispatch(setAppBoards(boardsAPI));
    }
  }
);

export const createNewBoardAPI = createAsyncThunk(
  'createNewBoardAPI',
  async (data: ICreateBoard, { dispatch }) => {
    const boardAPI = await httpClient.createBoard(data.token, data.board);
    if (boardAPI) {
      getAllBoardsFromAPI(data.token);
      dispatch(setIsChanged(true));
      dispatch(getAllBoardsFromAPI(data.token));
    }
  }
);

export const getBoardByIdAPI = createAsyncThunk(
  'getBoardByIdAPI',
  async (data: IGetBoard, { dispatch }) => {
    const boardAPI = await httpClient.getBoardByID(data.token, data.boardId);
    if (boardAPI) {
      dispatch(setCurrentBoard(boardAPI));
    }
  }
);

export const updateBoard = createAsyncThunk(
  'updateBoard',
  async (data: IUpdateBoard, { dispatch }) => {
    await httpClient.updateBoard(data.token, data.boardId, { title: data.boardTitle });
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const getBoardColumnsFromAPI = createAsyncThunk(
  'getBoardColumnsFromAPI',
  async (data: IGetBoardColumns, { dispatch }) => {
    const boardColumnsAPI = await httpClient.getAllColumns(data.token, data.boardId);
    dispatch(setAppColumns(boardColumnsAPI));
  }
);

export const createNewColumnAPI = createAsyncThunk(
  'createNewColumnAPI',
  async (data: ICreateColumn, { dispatch }) => {
    const columnAPI = await httpClient.createColumn(data.token, data.board.id, data.columnBody);
    if (columnAPI) {
      dispatch(setIsChanged(true));
      dispatch(setCurrentBoard(data.board));
    }
  }
);

export const updateColumnAPI = createAsyncThunk(
  'updateColumnAPI',
  async (data: IUpdateColumn, { dispatch }) => {
    await httpClient.updateColumn(data.token, data.boardId, data.columnId, {
      title: data.columnTitle,
      order: data.columnOrder,
    });
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const deleteColumnAPI = createAsyncThunk(
  'createNewColumnAPI',
  async (data: IDeleteColumn, { dispatch }) => {
    try {
      await httpClient.deleteColumn(data.token, data.boardId, data.columnId);
    } catch {}

    const boardColumnsAPI = await httpClient.getAllColumns(data.token, data.boardId);
    if (boardColumnsAPI) {
      let order = 1;
      const columnsSorted: Array<IColumn> = boardColumnsAPI.sort(
        (a: ITask, b: ITask) => a.order - b.order
      );
      columnsSorted.forEach((column: IColumn) => {
        if (column.order !== order) {
          column.order = order;
          dispatch(
            updateColumnAPI({
              token: data.token,
              boardId: data.boardId,
              columnId: column.id,
              columnTitle: column.title,
              columnOrder: column.order,
            })
          );
        }
        order += 1;
      });
    }
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const deleteAllBoardColumns = createAsyncThunk(
  'deleteAllBoardColumns',
  async (data: IDeleteBoard, { dispatch }) => {
    await httpClient.deleteBoard(data.token, data.boardId);
    dispatch(getAllBoardsFromAPI(data.token));
  }
);

export const createNewTaskAPI = createAsyncThunk(
  'createNewTaskAPI',
  async (data: ICreateTask, { dispatch }) => {
    const tasksAPI = await httpClient.createTask(data.token, data.board.id, data.columnId, {
      title: data.taskTitle,
      order: data.taskOrder,
      description: data.taskDescription,
      userId: data.userId,
    });
    if (tasksAPI) {
      dispatch(
        getAllTasksFromAPI({ token: data.token, boardId: data.board.id, columnId: data.columnId })
      );
      dispatch(setIsChanged(true));
    }
  }
);

export const updateTaskAPI = createAsyncThunk(
  'updateTaskAPI',
  async (data: IUpdateTask, { dispatch }) => {
    await httpClient.updateTask(data.token, data.boardId, data.columnId, data.taskId, {
      title: data.taskTitle,
      order: data.taskOrder,
      description: data.taskDescription,
      userId: data.userId,
      boardId: data.boardId,
      columnId: data.columnId,
    });
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const deleteTaskAPI = createAsyncThunk(
  'deleteTaskAPI',
  async (data: IDeleteTask, { dispatch }) => {
    try {
      await httpClient.deleteTask(data.token, data.boardId, data.columnId, data.taskId);
      dispatch(
        getAllTasksFromAPI({ token: data.token, boardId: data.boardId, columnId: data.columnId })
      );
      dispatch(setIsChanged(true));
    } catch {}
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const getAllTasksFromAPI = createAsyncThunk(
  'getAllTasksFromAPI',
  async (data: IGetTasks, { dispatch }) => {
    const tasksAPI = await httpClient.getAllTasks(data.token, data.boardId, data.columnId);
    if (tasksAPI) {
      let order = 1;
      const tasksSorted: Array<ITask> = tasksAPI.sort((a: ITask, b: ITask) => a.order - b.order);
      tasksSorted.forEach((task: ITask, index) => {
        if (task.order !== order) {
          task.order = order;
          dispatch(
            updateTaskAPI({
              token: data.token,
              boardId: data.boardId,
              columnId: data.columnId,
              taskId: task.id,
              taskTitle: task.title,
              taskOrder: index + 1,
              taskDescription: task.description,
              userId: task.userId,
            })
          );
        }
        order += 1;
      });
      dispatch(setAppTasks(tasksSorted));
    }
  }
);
/*
export const dragAndDropTaskInColumnAPI = createAsyncThunk(
  'dragAndDropTaskInColumnAPI',
  async (data: IGetTasksForDNDinColumn, { dispatch }) => {
    const tasksAPI = await httpClient.getAllTasks(data.token, data.boardId, data.columnId);
    if (tasksAPI) {
      const tasksSorted: Array<ITask> = tasksAPI.sort((a: ITask, b: ITask) => a.order - b.order);
      if (data.oldIndex > data.newIndex) {
        const draggableTask: Array<ITask> = tasksSorted.splice(data.oldIndex, 1);

        tasksSorted.splice(data.newIndex, 0, draggableTask[0]);
      }
      if (data.oldIndex < data.newIndex) {
        const draggableTask: Array<ITask> = tasksSorted.splice(data.oldIndex, 1);

        tasksSorted.splice(data.newIndex, 0, draggableTask[0]);
      }

      const tasksAfterDnD = tasksSorted.map((task: ITask, index) => {
        return {
          id: task.id,
          title: task.title,
          order: index,
          description: task.description,
          userId: task.userId,
          boardId: task.boardId,
          columnId: task.columnId,
        };
      });

      tasksAfterDnD.forEach((task: ITask, index) => {
        dispatch(
          updateTaskAPI({
            token: data.token,
            boardId: data.boardId,
            columnId: data.columnId,
            taskId: task.id,
            taskTitle: task.title,
            taskOrder: index + 1,
            taskDescription: task.description,
            userId: task.userId,
          })
        );
      });
      dispatch(setAppTasks(tasksSorted));
    }
  }
);

export const dragAndDropTaskBetweenColumnsAPI = createAsyncThunk(
  'dragAndDropTaskInColumnAPI',
  async (data: IGetTasksForDNDinTwoColumns, { dispatch }) => {
    const oldColumnTasksAPI = await httpClient.getAllTasks(
      data.token,
      data.boardId,
      data.oldColumnId
    );
    const newColumnTasksAPI = await httpClient.getAllTasks(
      data.token,
      data.boardId,
      data.newColumnId
    );

    if (oldColumnTasksAPI && newColumnTasksAPI) {
      const oldTasksSorted: Array<ITask> = oldColumnTasksAPI.sort(
        (a: ITask, b: ITask) => a.order - b.order
      );
      const newTasksSorted: Array<ITask> = newColumnTasksAPI.sort(
        (a: ITask, b: ITask) => a.order - b.order
      );

      const draggableTask: ITask = oldTasksSorted[data.oldIndex];
      newTasksSorted.splice(data.newIndex, 0, draggableTask);

      dispatch(
        deleteTaskAPI({
          token: data.token,
          boardId: data.boardId,
          columnId: data.oldColumnId,
          taskId: draggableTask.id,
        })
      );

      dispatch(
        createNewTaskAPI({
          token: data.token,
          board: data.board,
          columnId: data.newColumnId,
          taskTitle: draggableTask.title,
          taskOrder: newColumnTasksAPI.length,
          taskDescription: draggableTask.description,
          userId: draggableTask.userId,
        })
      );

      const addNewColumnTasksAPI = await httpClient.getAllTasks(
        data.token,
        data.boardId,
        data.newColumnId
      );
      const addNewTasksSorted: Array<ITask> = addNewColumnTasksAPI.sort(
        (a: ITask, b: ITask) => a.order - b.order
      );

      const newDraggedTask = addNewTasksSorted.splice(addNewTasksSorted.length - 1, 1);
      addNewTasksSorted.splice(data.newIndex, 0, newDraggedTask[0]);

      addNewTasksSorted.forEach((task: ITask, index) => {
        dispatch(
          updateTaskAPI({
            token: data.token,
            boardId: data.boardId,
            columnId: data.newColumnId,
            taskId: task.id,
            taskTitle: task.title,
            taskOrder: index + 1,
            taskDescription: task.description,
            userId: task.userId,
          })
        );        
      });
      dispatch(setAppTasks(newTasksSorted));
    }
  }
);
*/

export const dataSlice = createSlice({
  name: 'boardsFunctions',
  initialState,
  reducers: {
    setAppBoards: (state, action) => {
      return { ...state, boardsArray: action.payload };
    },
    setCurrentBoard: (state, action) => {
      return { ...state, currentBoard: action.payload };
    },
    setAppColumns: (state, action) => {
      return { ...state, columnsArray: action.payload };
    },
    setCurrentColumn: (state, action) => {
      return { ...state, currentColumn: action.payload };
    },
    setAppTasks: (state, action) => {
      return { ...state, tasksArray: action.payload };
    },
    setIsChanged: (state, action) => {
      return { ...state, isChanged: action.payload };
    },
    setIsModalOn: (state, action) => {
      return { ...state, isModalOn: action.payload };
    },
  },
});

export const {
  setAppBoards,
  setCurrentBoard,
  setAppColumns,
  setCurrentColumn,
  setAppTasks,
  setIsChanged,
  setIsModalOn,
} = dataSlice.actions;

export default dataSlice.reducer;
