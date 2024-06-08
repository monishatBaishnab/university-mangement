import httpStatus from 'http-status';
import { ZodError, ZodIssue, string } from 'zod';
import { TGenericErrorResponse } from '../interface/errors';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const message = 'Validation error!';
  const statusCode = httpStatus.BAD_REQUEST;
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    message,
    errorSources,
    statusCode,
  };
};

export default handleZodError;
