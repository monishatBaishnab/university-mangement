import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { TErrorSources } from '../interface/errors';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/HandleDuplicateError';
import { AppError } from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = err?.message || 'Something want wrong!';
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
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);

    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    statusCode = simplifiedError.statusCode;
  } else if (err instanceof AppError) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // stack: config.node_env === 'development' ? err?.stack : null,
    err: err
  });
};

export default globalErrorHandler;
