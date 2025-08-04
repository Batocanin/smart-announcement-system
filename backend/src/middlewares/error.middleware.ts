import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

type FormatedError = {
  message: string;
  status: number;
  stack?: string;
};

export const errorHandlerMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  const formatedError: FormatedError = {
    message: "An error occured.",
    status: 500,
    stack: undefined,
  };

  if (error instanceof AppError) {
    formatedError.message = error.message;
    formatedError.status = error.statusCode;
  }

  if (process.env.NODE_ENV !== "production" && error instanceof Error) {
    formatedError.stack = error.stack;
  }

  res.status(formatedError.status).send(formatedError);
};
