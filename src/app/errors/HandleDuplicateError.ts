import { TGenericErrorResponse } from "../interface/errors";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]+)"/);
    const extractedMsg = match ? match[1] : null;
    
    return ({
        statusCode: 500,
        message: `${extractedMsg} is already exists.`,
        errorSources: [{
            path: extractedMsg,
            message: `${extractedMsg} is already exists.`,
        }]
    })
}

export default handleDuplicateError;