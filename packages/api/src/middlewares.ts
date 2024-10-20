import { NextFunction, Request, Response } from 'express';

import { getSession } from '@auth/express';
import { ErrorResponse } from './interfaces/ApiResponse.js';
import { authConfig } from './config/auth.js';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    error: {
      message: err.message,
      code: statusCode,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    },
  });
}

export async function currentSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = (await getSession(req, authConfig)) ?? undefined;
  res.locals.session = session;
  return next();
}

export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session =
    res.locals.session ?? (await getSession(req, authConfig)) ?? undefined;

  res.locals.session = session;

  if (session) {
    return next();
  }

  res.status(401).json({ message: 'Not Authenticated' });
}
