import { Response } from 'express';

export const sendResp = (res: Response, msg: IResponseMessage, result?: any) => {
    return res.status(msg.headerCode).json({
        success: msg.success,
        message: msg.message,
        statusCode: msg.statusCode,
        result
    });
}

export const handleError = (res: Response, err: Error, result: any) => {
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        statusCode: 500,
        result
    })
}

export const sendRespHTML = (res: Response, msg: IResponseMessage, result?: any) => {
    if(msg.headerCode == 200) {
        return res.render("success.ejs", {
            code: "",
            msg: "",
            error: [],
            data: {
                success: msg.success,
                message: msg.message,
                statusCode: msg.statusCode,
                result
            }
        });
    } else {
        return res.render("error.ejs", {
            code: "",
            msg: "",
            error: [],
            data: {
                success: msg.success,
                message: msg.message,
                statusCode: msg.statusCode,
                result
            }
        });
    }
}

export const handleErrorHTML = (res: Response, err: Error, result: any) => {
    return res.render("error.ejs", {
        code: "",
        msg: "",
        error: [],
        data: {
            success: false,
            message: 'Internal server error',
            statusCode: 500,
            result
        }
    });
}

export interface IResponseMessage {
    success: boolean;
    statusCode: number;
    message: string;
    headerCode: number;
}