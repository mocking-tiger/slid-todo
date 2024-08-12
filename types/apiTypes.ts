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
