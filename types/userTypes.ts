export type BasicUserType = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  updatedAt: string;
};

export interface PagePropsType {
  params: {
    goalID?: string;
  };
  noteID?: string;
}

export type GoalDetailType = {
  createdAt: string;
  id: number;
  teamId: string;
  title: string;
  updatedAt: string;
  userId: number;
};

export type TodoType = {
  createdAt: string;
  done: boolean;
  fileUrl: string;
  goal: { title: string; id: number };
  id: number;
  linkUrl: string;
  noteId: any;
  teamId: string;
  title: string;
  updatedAt: string;
  userId: number;
};
