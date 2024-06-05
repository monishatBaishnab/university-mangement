import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { TErrorSources } from '../interface/errors';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something want wrong!';
  let errorSources: TErrorSources[] = [
    {
      path: '',
      message: 'Something want wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
    // err
  });
};

export default globalErrorHandler;
