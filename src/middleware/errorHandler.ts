import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

// Middleware para manejar errores en la aplicación
export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(`[Error] ${err.message}`);

  const status = err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({
    status,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}

export default errorHandler;
