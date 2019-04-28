

export const ERROR_MESSAGES = {

    FIELD_VALIDATION_FAILED: {
        statusCode: 422,
        headerCode: 422,
        message: 'Field validation failed',
        success: false
    },
    PASSCODE_ALREADY_SET: {
        statusCode: 422,
        headerCode: 422,
        message: 'Passcode is already set',
        success: false
    },
    PASSCODE_NOT_SET: {
        statusCode: 422,
        headerCode: 422,
        message: 'Passcode is not set',
        success: false
    },
    ALLOWED_TIME_EXPIRED: {
        statusCode: 422,
        headerCode: 422,
        message: 'Allowed time to change pin is expired',
        success: false
    },
    WALLET_IS_LOCKED: {
        statusCode: 428,
        headerCode: 428,
        message: 'Wallet is locked',
        success: false
    },
    INVALID_TOKEN: {
        statusCode: 422,
        headerCode: 422,
        message: 'Invalid token',
        success: false
    },
    INVALID_EMAIL: {
        statusCode: 42204,
        headerCode: 422,
        message: 'Email not found',
        success: false
    },
    SESSION_INVALID: {
        statusCode: 400,
        headerCode: 400,
        message: 'Invalid access token provided',
        success: false
    },
    AUTH_TOKEN_NOT_PROVIDED: {
        statusCode: 499,
        headerCode: 401,
        message: 'authorization token was not provided in the header, please login first to generate access token',
        success: false
    },
    INVALID_ID: {
        statusCode: 42205,
        headerCode: 422,
        message: 'Invalid id',
        success: false
    },
    INVALID_ORDER_ID: {
        statusCode: 42205,
        headerCode: 422,
        message: 'Invalid order id',
        success: false
    },
    INVALID_SERVICE_ID: {
        statusCode: 42205,
        headerCode: 422,
        message: 'Invalid service id',
        success: false
    },
    INVALID_SERVICE_TYPE: {
        statusCode: 42206,
        headerCode: 422,
        message: 'Invalid service type',
        success: false
    },
    INVALID_OLD_PASSWORD: {
        statusCode: 42207,
        headerCode: 422,
        message: 'Invalid Old Password',
        success: false
    },
    INVALID_STAFF_ID: {
        statusCode: 42276,
        headerCode: 422,
        message: 'Invalid staff id',
        success: false
    },
    NO_RECORD_FOUND: {
        statusCode: 40406,
        headerCode: 404,
        message: 'No record found',
        success: false
    },
    INVALID_PUBLIC_KEY: {
        statusCode: 42209,
        headerCode: 422,
        message: 'Public key is not valid',
        success: false
    },
    COIN_TRANSECTION_ERROR: {
        statusCode: 42221,
        headerCode: 422,
        message: 'Transection failed',
        success: false
    },
    OTP_EXPIRED: {
        statusCode: 422,
        headerCode: 422,
        message: 'OTP has been expired',
        success: false
    },
    TOKEN_EXPIRED: {
        statusCode: 422,
        headerCode: 422,
        message: 'Token has been expired',
        success: false
    },
    INVALID_OTP: {
        statusCode: 422,
        headerCode: 422,
        message: 'Invalid otp',
        success: false
    },
    EMAIL_EXIST: {
        statusCode: 42201,
        headerCode: 422,
        message: 'Email is already registered',
        success: false
    },
    MOBILE_EXIST: {
        statusCode: 42202,
        headerCode: 422,
        message: 'Mobile number is already registered',
        success: false
    },
    INVALID_GENDER: {
        statusCode: 42202,
        headerCode: 422,
        message: 'Invalid gender type',
        success: false
    },
    INVALID_DATE: {
        statusCode: 42202,
        headerCode: 422,
        message: 'Date is not valid',
        success: false
    },
    INVALID_VENDOR_STRIPE_ID: {
        statusCode: 42211,
        headerCode: 422,
        message: 'Invalid vendor stripe ID',
        success: false
    },
    INVALID_CUSTOMER_STRIPE_ID: {
        statusCode: 42212,
        headerCode: 422,
        message: 'Invalid customer stripe ID',
        success: false
    },
    STRIPE_PAYMENT_FAILED: {
        statusCode: 42213,
        headerCode: 422,
        message: 'Stripe payment failed',
        success: false
    },
    USER_NOT_FOUND: {
        statusCode: 40404,
        headerCode: 404,
        message: 'User not found',
        success: false
    },
    DATA_NOT_FOUND: {
        statusCode: 40405,
        headerCode: 404,
        message: 'Data not found',
        success: false
    },
    INVALID_ROOM_DATA: {
        statusCode: 42206,
        headerCode: 422,
        message: 'roomData is not valid',
        success: false
    },
    SOMETHING_WENT_WRONG: {
        statusCode: 42206,
        headerCode: 422,
        message: 'Something went wrong',
        success: false
    },
    NO_DATA_FOUND: {
        statusCode: 40407,
        headerCode: 404,
        message: 'No data found',
        success: false
    },
    UNAUTHORIZED: {
        statusCode: 401,
        headerCode: 401,
        message: 'Unauthorized',
        success: false
    },
    ACCOUNT_BLOCKED: {
        statusCode: 411,
        headerCode: 411,
        message: 'Account blocked by admin',
        success: false
    },
    SUCCESS: {
        statusCode: 200,
        headerCode: 200,
        message: 'Success',
        success: true
    },
    INVALID_CREDENTIALS: {
        statusCode: 400,
        headerCode: 400,
        message: 'Invalid credentials provided',
        success: false
    },
    USERNAME_ALREADY_USED: {
        statusCode: 400,
        headerCode: 400,
        message: 'Username already in use',
        success: false
    },
    MOBILE_ALREADY_USED: {
        statusCode: 400,
        headerCode: 400,
        message: 'Mobile number already in use',
        success: false
    },
    SOME_ERROR_DURING_CALL_REQUEST: {
        statusCode: 400,
        headerCode: 400,
        message: 'Some error occured during call request, plase try again after some time.',
        success: false
    },
    INVALID_MOBILE_NUMBER: {
        statusCode: 400,
        headerCode: 400,
        message: 'Invalid mobile number was provided',
        success: false
    },
    SAME_NUMBER_USE: {
        statusCode: 400,
        headerCode: 400,
        message: 'You can not use your registered mobile number',
        success: false
    },
    TOO_LONG_MESSAGE: {
        statusCode: 400,
        headerCode: 400,
        message: 'Message length should be maximum 250 char.',
        success: false
    },
    OTP_RESEND_SUCCESS: {
        statusCode: 200,
        headerCode: 200,
        message: 'OTP Resent seccussfully',
        success: true
    },
    TOKEN_NOT_FOUND: {
        statusCode: 422,
        headerCode: 422,
        message: 'Access token not found',
        success: false
    },
    INTERNAL_SERVER: {
        statusCode: 500,
        headerCode: 500,
        message: 'Internal server error',
        success: false
    },
    BLOCKED_BY_ADMIN: {
        statusCode: 411,
        headerCode: 411,
        message: 'Account blocked by admin',
        success: false
    },
    INVALID_ACTION: {
        statusCode: 42202,
        headerCode: 422,
        message: 'Invalid action performed',
        success: false
    }
}