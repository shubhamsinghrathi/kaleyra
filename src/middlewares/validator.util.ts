// const { check, validationResult, param } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');

import { check, param, body } from 'express-validator/check';

export const checkEmail = (email) => {
    return check(email)
        .exists()
        // .isEmail()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i')
        .trim()
}

export const checkEmailOptional = (email) => {
    return check(email)
        .optional()
        // .isEmail()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i')
        .trim()
}

export const checkBody = (val) => {
    return check(val)
        .trim()
        .isLength( { min: 1 } )
        .exists()
}

export const checkBodyOptional = (val) => {
    return check(val)
        .trim()
        .optional()
}

export const checkArray = (val) => {
    return check(val)
        .isArray()
        .exists()
}

export const checkArrayOptional = (val) => {
    return check(val)
        .isArray()
        .optional()
}

export const checkBoolean = (val) => {
    return body(val)
        .trim()
        .exists()
        .isBoolean()

}

export const checkBooleanOptional = (val) => {
    return check(val)
        .trim()
        .optional()
        .isBoolean()

}

export const checkParamMongoId = (val) => {
    return check(val).exists().isMongoId().trim()

}

export const checkMongoIdOptional = (val) => {
    return check(val)
        .optional()
        .isMongoId()
        .trim()
}

export const mongoIdChecker = (val) => {
    return check(val).exists().isMongoId().trim()
}

export const numberCheck = (val) => {
    return check(val).exists().isNumeric()
}

export const numberCheckOptional = (val) => {
    return check(val).optional().isNumeric()
}
