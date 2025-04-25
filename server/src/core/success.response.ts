'use stric';

import statusCodes from './statusCodes';
import reasonPhrases from './reasonPhrases';
import { Response } from 'express';

interface SuccessResponseOptions {
    message?: string;
    statusCode?: number;
    reasonPhrasesCode?: string;
    metadata?: any;
}

class SuccessResponse {
    message: string;
    statusCode: number;
    metadata: any;
    constructor({
        message,
        statusCode = statusCodes.OK,
        reasonPhrasesCode = reasonPhrases.OK,
        metadata = {},
    }: SuccessResponseOptions) {
        this.message = !message ? reasonPhrasesCode : message;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }

    send(res: Response, header = {}) {
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({
        message,
        statusCode = statusCodes.OK,
        reasonPhrasesCode = reasonPhrases.OK,
        metadata,
    }: SuccessResponseOptions) {
        super({ message, statusCode, reasonPhrasesCode, metadata });
    }
}

class Created extends SuccessResponse {
    constructor({
        message,
        statusCode = statusCodes.CREATED,
        reasonPhrasesCode = reasonPhrases.CREATED,
        metadata,
    }: SuccessResponseOptions) {
        super({ message, statusCode, reasonPhrasesCode, metadata });
    }
}

export { OK, Created };
