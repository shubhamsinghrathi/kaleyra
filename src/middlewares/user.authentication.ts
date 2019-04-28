import { UserSession } from '../models';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../constant';
import { handleError, sendResp } from '../util'

/**
 * userSignupRedirect
 * User to redirect a user to the signup page
 * @param res 
 */
const userSignupRedirect = (res) => {
    return res.redirect('/signup');
}

/**
 * userHomeRedirect
 * User to redirect a user to the home page
 * @param res 
 */
const userHomeRedirect = (res) => {
    return res.redirect('/');
}

/**
 * userCheckCookies
 * used to check the user's access token
 * @param req 
 * @param res 
 * @param next 
 */
export const userCheckCookies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Cookies: ', req.cookies)
        let cookies = req.cookies || {};
        let userToken = cookies.token || null;
        if(!userToken) {
            return userSignupRedirect(res);
        } else {
            let userData = await UserSession.findOne({ userToken }).populate('userId').lean();
            if(!userData) {
                return userSignupRedirect(res);
            } else {
                req.body.userData = userData.userId || {};
                return next();
            }
        }
    } catch (err) {
        return userSignupRedirect(res);
    }
}

/**
 * userSignupCheck
 * used to check the user's if user is okay to signup/login or not
 * @param req 
 * @param res 
 * @param next 
 */
export const userSignupCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Cookies: ', req.cookies)
        let cookies = req.cookies || {};
        let userToken = cookies.token || null;
        if(!userToken) {
            return next();
        } else {
            let userData = await UserSession.findOne({ userToken }).lean();
            if(!userData) {
                return next();
            } else {
                return userHomeRedirect(res)
            }
        }
    } catch (err) {
        return next();
    }
}



/**
 * userCheckSession
 * used to check the user's access token
 * @param req 
 * @param res 
 * @param next 
 */
export const userCheckSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rowtoken = req.headers['x-access-token'] || req.headers['authorization'];
        if(!rowtoken) return sendResp(res, ERROR_MESSAGES.AUTH_TOKEN_NOT_PROVIDED, {});
        const token = rowtoken.toString().replace("Bearer", "").trim();
        req.body.token = token;
        if (!token) return sendResp(res, ERROR_MESSAGES.SESSION_INVALID, {});
        let info;
        try { info = await jwt.verify(token, process.env['secret']) } catch (er) { return sendResp(res, ERROR_MESSAGES.SESSION_INVALID, {}); }
        let userData = await UserSession.findOne({ _id: info["_id"] || "" }).lean();
        if(!userData) return sendResp(res, ERROR_MESSAGES.SESSION_INVALID, {});
        return next();
    } catch (err) {
        return handleError(res, err, {});
    }
}