export interface ErrorType {
  message?: string;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export interface GoalType {
  createdAt: string;
  id: number;
  teamId: string;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface TodoType {
  createdAt: string;
  done: boolean;
  fileUrl: string;
  goal: {
    id: number;
    title: string;
  };
  id: number;
  linkUrl: string;
  noteId: any;
  teamId: string;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface AllTodoType {
  nextCursor: number | null;
  todos: TodoType[];
  totalCount: number;
}

export interface NoteType {
  content: string;
  createdAt: string;
  goal: {
    id: number;
    title: string;
  };
  id: number;
  linkUrl: string;
  teamId: string;
  title: string;
  todo: {
    done: boolean;
    fileUrl: string | null;
    id: number;
    linkUrl: string | null;
    title: string;
  };
  updatedAt: string;
  userId: number;
}
