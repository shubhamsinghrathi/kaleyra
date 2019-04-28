import { ERROR_MESSAGES } from '../constant';
import { Request, Response, NextFunction } from 'express';
import { handleError, sendResp, handleErrorHTML, sendRespHTML } from '../util';
import { validationResult } from 'express-validator/check';

export const validator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const error = validationResult(req);
        if (error.isEmpty()) {
            next();
        } else {
            console.error('Field validation failed', error.mapped());
            return sendRespHTML(res, ERROR_MESSAGES.FIELD_VALIDATION_FAILED, {});
        }
    } catch (err) {
        return handleErrorHTML(res, err, {});
    }
}