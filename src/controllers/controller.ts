import { Response } from 'express';


export class Controller {

    constructor() {

    }

    protected response(res: Response, meta: IResponse, result: any) {
        res.status(meta.headerCode || 500)
            .json({
                success: meta.success,
                statusCode: meta.statusCode,
                message: meta.message,
                result
            });
    }
}


export interface IResponse {
    success: boolean;
    statusCode: number;
    message: string;
    headerCode: number;
}