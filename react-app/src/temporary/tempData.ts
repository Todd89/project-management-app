import { IBoard, ITask, IColumn, IAppUser } from '../interface/interfaces';

export const usersArray: Array<IAppUser> = [
  { id: 'user001', name: 'Ekaterin', login: 'Katya' },
  {
    id: 'user002',
    name: 'Pyotr',
    login: 'Petya',
  },
];

export const boardsArray: Array<IBoard> = [
  {
    id: 'board001',
    title: 'Shopping list',
    columns: [
      {
        id: 'column001',
        title: 'to buy',
        order: 1,
        tasks: [
          {
            id: 'task001',
            title: 'bread',
            order: 2,
            done: true,
            description: '',
            userId: 'user001',
            files: [],
          },
          {
            id: 'task002',
            title: 'chocolate',
            order: 1,
            done: false,
            description: 'bitter',
            userId: 'user001',
            files: [],
          },
        ],
      },
    ],
  },
  {
    id: 'board003',
    title: 'Movies list',
    columns: [
      {
        id: 'column002',
        title: 'to watch',
        order: 2,
        tasks: [
          {
            id: 'task003',
            title: 'Beautiful mind',
            order: 1,
            done: false,
            description: 'drama, biography',
            userId: 'user001',
            files: [],
          },
        ],
      },
      {
        id: 'column003',
        title: 'in process',
        order: 1,
        tasks: [
          {
            id: 'task004',
            title: 'Magdalena sisters',
            order: 1,
            done: true,
            description: 'drama',
            userId: 'user001',
            files: [],
          },
        ],
      },
    ],
  },
  {
    id: 'board002',
    title: 'Study',
    columns: [
      {
        id: 'column004',
        title: 'future tasks',
        order: 2,
        tasks: [
          {
            id: 'task005',
            title: 'French, conjugations',
            order: 1,
            done: true,
            description: 'I,II',
            userId: 'user002',
            files: [],
          },
          {
            id: 'task006',
            title: 'Astrophysics',
            order: 1,
            done: false,
            description: 'first two lectures by prof. Popov',
            userId: 'user002',
            files: [],
          },
        ],
      },
    ],
  },
];

export const columnsArray: Array<IColumn> = [
  {
    id: 'column001',
    title: 'to buy',
    order: 1,
    tasks: [
      {
        id: 'task001',
        title: 'bread',
        order: 2,
        done: true,
        description: '',
        userId: 'user001',
        files: [],
      },
      {
        id: 'task002',
        title: 'chocolate',
        order: 1,
        done: false,
        description: 'bitter',
        userId: 'user001',
        files: [],
      },
    ],
  },
  {
    id: 'column002',
    title: 'to watch',
    order: 2,
    tasks: [
      {
        id: 'task003',
        title: 'Beautiful mind',
        order: 1,
        done: false,
        description: 'drama, biography',
        userId: 'user001',
        files: [],
      },
    ],
  },
  {
    id: 'column003',
    title: 'in process',
    order: 1,
    tasks: [
      {
        id: 'task004',
        title: 'Magdalena sisters',
        order: 1,
        done: true,
        description: 'drama',
        userId: 'user001',
        files: [],
      },
    ],
  },
  {
    id: 'column004',
    title: 'future tasks',
    order: 2,
    tasks: [
      {
        id: 'task005',
        title: 'French, conjugations',
        order: 1,
        done: true,
        description: 'I,II',
        userId: 'user002',
        files: [],
      },
      {
        id: 'task006',
        title: 'Astrophysics',
        order: 1,
        done: false,
        description: 'first two lectures by prof. Popov',
        userId: 'user002',
        files: [],
      },
    ],
  },
];

export const tasksArray: Array<ITask> = [
  {
    id: 'task001',
    title: 'bread',
    order: 2,
    description: '',
    userId: 'user001',
    boardId: 'board001',
    columnId: 'column001',
  },
  {
    id: 'task002',
    title: 'chocolate',
    order: 1,
    description: 'bitter',
    userId: 'user001',
    boardId: 'board001',
    columnId: 'column001',
  },
  {
    id: 'task003',
    title: 'Beautiful mind',
    order: 1,
    description: 'drama, biography',
    userId: 'user001',
    boardId: 'board003',
    columnId: 'column002',
  },
  {
    id: 'task004',
    title: 'Magdalena sisters',
    order: 1,
    description: 'drama',
    userId: 'user001',
    boardId: 'board003',
    columnId: 'column003',
  },
  {
    id: 'task005',
    title: 'French, conjugations',
    order: 1,
    description: 'I,II',
    userId: 'user002',
    boardId: 'board002',
    columnId: 'column004',
  },
  {
    id: 'task006',
    title: 'Astrophysics',
    order: 1,
    description: 'first two lectures by prof. Popov',
    userId: 'user002',
    boardId: 'board002',
    columnId: 'column004',
  },
];
