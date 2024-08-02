export interface ErrorType {
  message?: string;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}
