'use stric';

import statusCodes from './statusCodes';
import reasonPhrases from './reasonPhrases';

class ErrorResponse extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.CONFLICT, statusCode = statusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.CONFLICT, statusCode = statusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class BadUserRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.UNAUTHORIZED, statusCode = statusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

export { ConflictRequestError, BadRequestError, BadUserRequestError };
