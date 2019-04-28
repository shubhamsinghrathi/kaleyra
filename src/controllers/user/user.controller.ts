import { Request, Response, NextFunction } from 'express';
import { User, UserSession, Call, Message } from '../../models/';
import { hashPassword, sendMessage, makeCall, sendRespHTML, handleErrorHTML, randomStringGenerator } from '../../util';
import { ERROR_MESSAGES, CONSTANT } from '../../constant';

/**
 * @author Shubham Rathi
 * @description this controller cointains actions for user's related activities
 */
export class UserController {
   constructor() {}

   /**
    * userSignupGET
    * User's signup GET request
    * @param req 
    * @param res 
    */
   public async userSignupGET(req: Request, res: Response) {
        return res.render("userSignup.ejs", {
            code: "",
            msg: "",
            error: [],
            data: {}
        });
   }

   /**
    * userSignupPOST
    * User's signup request handler
    * @param req 
    * @param res 
    */
   public async userSignupPOST(req: Request, res: Response) {
       try {
           let { name, mobileNumber, password } = req.body;
           let data = await User.findOne({ mobileNumber }).lean();
           if(data) return sendRespHTML(res, ERROR_MESSAGES.MOBILE_ALREADY_USED, {});
           let to_save = {
               name,
               mobileNumber,
               password: await hashPassword(password)
           }
           await User.create(to_save);
           return res.redirect("/login");
       } catch (err) {
            global.log("error in userSignupPOST: ", err);
            return handleErrorHTML(res, err, {});
        }
   }

   /**
    * userLoginGET
    * User's login GET request
    * @param req 
    * @param res 
    */
   public async userLoginGET(req: Request, res: Response) {
        return res.render("userLogin.ejs", {
            code: "",
            msg: "",
            error: [],
            data: {}
        });
    }

    /**
    * userLogout
    * User's login request handler
    * @param req 
    * @param res 
    */
   public async userLoginPOST(req: Request, res: Response) {
    try {
        let { mobileNumber, password } = req.body;
        password = await hashPassword(password)
        let data = await User.findOne({ mobileNumber, password }).lean();
        if(!data) return sendRespHTML(res, ERROR_MESSAGES.INVALID_CREDENTIALS, {});

        let userToken = randomStringGenerator(40);
        await UserSession.create({
            userId: data._id,
            userToken
        });
        //SETING COOKIES
        res.cookie('token',userToken, { maxAge: 9000000 });
        return res.redirect("/");
    } catch (err) {
        global.log("error in userLoginPOST: ", err);
        return handleErrorHTML(res, err, {});
    }
}


   /**
    * userLoginPOST
    * User's logout request handler
    * @param req 
    * @param res 
    */
   public async userLogout(req: Request, res: Response) {
        try {
            //REMOVING COOKIES
            res.cookie('token', {maxAge: Date.now()});
            return res.redirect("/login");
        } catch (err) {
            global.log("error in userLoginPOST: ", err);
            return handleErrorHTML(res, err, {});
        }
    }

    /**
    * userHome
    * User's home page
    * @param req 
    * @param res 
    */
   public async userHome(req: Request, res: Response) {
       let messageData = Message.find({ userId: req.body.userData._id }).lean();
       let callData = Call.find({ userId: req.body.userData._id }).lean();
       let data = await Promise.all([ messageData, callData ]);
       console.log("data[0]: ", data[0]);
        return res.render("home.ejs", {
            code: "",
            msg: "",
            error: [],
            data: {
                name: req.body.userData.name || "User",
                messageData: data[0] || [],
                callData: data[1] || []
            }
        });
    }

    /**
    * userMessage
    * User's send message request handler
    * @param req 
    * @param res 
    */
   public async userMessage(req: Request, res: Response) {
        try {
            let { mobileNumber, message, isBroadcast } = req.body;
            message = message.trim();
            if(message.length>250) return sendRespHTML(res, ERROR_MESSAGES.TOO_LONG_MESSAGE, {});

            let to_save = {
                userId: req.body.userData._id,
                fromNumber: req.body.userData.mobileNumber,
                message
            }

            if(isBroadcast == 'no') {
                mobileNumber = mobileNumber.trim();
                if(!mobileNumber) return sendRespHTML(res, ERROR_MESSAGES.INVALID_MOBILE_NUMBER, {});
                if(mobileNumber == req.body.userData.mobileNumber) return sendRespHTML(res, ERROR_MESSAGES.SAME_NUMBER_USE, {});
                mobileNumber = [ mobileNumber ]
                to_save["toNumber"] = mobileNumber[0];
                to_save["isBroadcast"] = false;
            } else {
                mobileNumber = [];
                let data = await User.find({ _id: { $ne: req.body.userData._id } }).lean();
                data.map(val => {
                    mobileNumber.push(val.mobileNumber.trim());
                });
                to_save["isBroadcast"] = true;
            }
            
            let response = await sendMessage({ toNumber: mobileNumber, message });
            if(response.failed) {
                to_save["status"] = "Failed"
            } else {
                to_save["status"] = "Success"
            }
            await Message.create(to_save);
            // return res.redirect("/");

            return res.render("success.ejs", {
                code: "",
                msg: "",
                error: [],
                data: {
                    message: "SMS has been sent successfully. Please note if the receiver's DND service is activated then they may not reveive your message."
                }
            });
        } catch (err) {
            global.log("error in userMessage: ", err);
            return handleErrorHTML(res, err, {});
        }
    }

    /**
    * userCall
    * User's send message request handler
    * @param req 
    * @param res 
    */
   public async userCall(req: Request, res: Response) {
        try {
            let { mobileNumber } = req.body;

            let to_save = {
                userId: req.body.userData._id,
                fromNumber: req.body.userData.mobileNumber
            }

            mobileNumber = mobileNumber.trim();
            if(!mobileNumber) return sendRespHTML(res, ERROR_MESSAGES.INVALID_MOBILE_NUMBER, {});
            if(mobileNumber == req.body.userData.mobileNumber) return sendRespHTML(res, ERROR_MESSAGES.SAME_NUMBER_USE, {});
            to_save["toNumber"] = mobileNumber;
            
            let response = await makeCall({ fromNumber: req.body.userData.mobileNumber, toNumber: mobileNumber });
            if(response.failed) {
                to_save["status"] = "Failed"
                await Call.create(to_save);
                return sendRespHTML(res, ERROR_MESSAGES.SOME_ERROR_DURING_CALL_REQUEST, {});
            } else {
                to_save["status"] = "Success"
                await Call.create(to_save);
            }

            return res.render("success.ejs", {
                code: "",
                msg: "",
                error: [],
                data: {
                    message: "Call request has been send to the server successfully. You will receive a call soon."
                }
            });
        } catch (err) {
            global.log("error in userCall: ", err);
            return handleErrorHTML(res, err, {});
        }
    }
}