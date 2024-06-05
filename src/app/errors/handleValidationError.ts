import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/errors';

const handleValidationError = (
    err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
    const message = 'Validation error!';
    const statusCode = httpStatus.BAD_REQUEST;

    const errorSources = Object.values(err?.errors).map(
        (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: error?.path,
                message: error?.message,
            };
        },
    );

    return {
        message,
        errorSources,
        statusCode,
    };
};

export default handleValidationError;
