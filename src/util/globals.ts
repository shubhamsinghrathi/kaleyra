/**
 * @author Shubham Rathi
 * @description This file used to creates global varialbles for the project. NOTE: If you are making a variable global then you have to be sure if that variable is worthy to be a global or not.
 */
import * as  winston from "winston";

 //extending the global's interface for new variables
declare global {
    namespace NodeJS {
        interface Global {
            log: any,
            logger: any
        }
    }
}

const log = (...args) => {
    console.log(...args);
}

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new (winston.transports.File)({
            filename: "debug.log", level: "debug"
        })
    ]
})

//making varialbles accessible throughout the project
export const initGlobals = () => {
    global.log = log;
    global.logger = logger;
}