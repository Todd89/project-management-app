import { INewBoard, INewColumn } from './types';

export interface IAppUser {
  id: string;
  name: string;
  login: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns: Array<IColumn>;
}

export interface IShortBoard {
  id: string;
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITaskInColumn>;
}

export interface ITempColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoardTempColumn {
  boardId: string;
  columns: Array<ITempColumn>;
}

export interface ITaskInColumn {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Array<IFile>;
}

export interface IFile {
  filename: string;
  filexize: number;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface TBoards {
  currentBoard: IBoard;
}

export interface TColumns {
  currentColumn: IColumn;
  boardColumns: Array<IColumn>;
}

export interface TUsers {
  usersArray: Array<IAppUser>;
}

export interface ICreateBoard {
  token: string;
  board: INewBoard;
}

export interface IDeleteBoard {
  token: string;
  boardId: string;
}

export interface ICreateColumn {
  token: string;
  board: IBoard;
  columnBody: INewColumn;
}

export interface IDeleteColumn {
  token: string;
  boardId: string;
  columnId: string;
}

export interface IGetBoard {
  token: string;
  boardId: string;
}

export interface IGetColumn {
  token: string;
  boardId: string;
  columnId: string;
}

export interface IGetAllColumns {
  token: string;
  boards: Array<IShortBoard>;
}

export interface IGetBoardColumns {
  token: string;
  boardId: string;
}

export interface IUpdateBoard {
  token: string;
  boardId: string;
  boardTitle: string;
}

export interface IUpdateColumn {
  token: string;
  boardId: string;
  columnId: string;
  columnTitle: string;
  columnOrder: number;
}

export interface IGetTasks {
  token: string;
  boardId: string;
  columnId: string;
  exceptOrder: number;
}

export interface ICreateTask {
  token: string;
  board: IBoard;
  columnId: string;
  taskTitle: string;
  taskOrder: number;
  taskDescription: string;
  userId: string;
}

export interface IUpdateTaskAPI {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
  taskTitle: string;
  taskOrder: number;
  taskDescription: string;
  userId: string;
}

export interface IUpdateAllTasks {
  tasksArray: Array<IUpdateTaskAPI>;
}

export interface IDeleteTask {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface IGetTasksForDNDinColumn {
  token: string;
  boardId: string;
  columnId: string;
  oldIndex: number;
  newIndex: number;
}

export interface IGetTasksForDNDinTwoColumns {
  token: string;
  boardId: string;
  oldColumnId: string;
  newColumnId: string;
  oldIndex: number;
  newIndex: number;
  board: IBoard;
}
