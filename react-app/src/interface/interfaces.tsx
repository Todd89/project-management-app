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

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITaskInColumn>;
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
  // appBoards: Array<IBoard>;
  currentBoard: IBoard;
}

export interface TColumns {
  currentColumn: IColumn;
  boardColumns: Array<IColumn>;
}

export interface TUsers {
  currentUser: IAppUser;
}
