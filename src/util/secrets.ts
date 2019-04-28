import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from 'path';

export const ENVIRONMENT = process.env.NODE_ENV;

switch (ENVIRONMENT) {
    case 'production': {
        if (fs.existsSync(path.join(__dirname, '../../.env'))) {
            dotenv.config({ path: ".env" });
        } else {
            global.logger.error('Environment file not found');
            process.exit(1);
        }
        break;
    }
    case 'development': {
        if (fs.existsSync(path.join(__dirname, '../../.env.development'))) {
            dotenv.config({ path: ".env.development" });
        } else {
            global.logger.error('Environment file not found');
            process.exit(1);
        }
        break;
    }
    case 'staging': {
        if (fs.existsSync(path.join(__dirname, '../../.env.staging'))) {
            dotenv.config({ path: ".env.staging" });
        } else {
            global.logger.error('Environment file not found');
            process.exit(1);
        }
        break;
    }
    default: {

        if (fs.existsSync(path.join(__dirname, '../../.env.local'))) {
            dotenv.config({ path: ".env.local" });
        } else {
            global.logger.error('Environment file not found');
            process.exit(1);
        }
    }
}



export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGODB_USER = process.env['MONGODB_USER'];
export const MONGODB_PASSWORD = process.env['MONGODB_PASSWORD'];
export const PORT = process.env['PORT'];
export const SALT = process.env['SALT'];
export const ENC = process.env['ENC'];
export const BASE_URL = process.env['baseURL'];
export const BASE_URL_ADMIN = process.env['baseURLAdmin'];

export const MAIL_KEY = process.env['MAIL_KEY'];
export const MAIL_SENDER = process.env['MAIL_SENDER'];
export const SMTP_USER = process.env['SMTP_USER'];
export const SMTP_PASSWORD = process.env['SMTP_PASSWORD'];
export const SMTP_HOST = process.env['SMTP_HOST'];
export const SMTP_PORT = process.env['SMTP_PORT'];
export const SMTP_SSL = process.env['SMTP_SSL'];

export const GOOGLE_API_KEY = process.env['GOOGLE_API_KEY'];

export const stripe_secret_key = 'sk_test_QHjFRXtEmoFyCP4O44P40oiJ' ||'pk_test_beoQKZjx2VeEu0hFPBmue0u7'

export const COIN_MANAGER_SERVER = process.env['COIN_MANAGER_SERVER'] + ':' + process.env['COIN_MANAGER_SERVER_PORT'];
export const CRYPTO_TEST_PUBLIC_ADDRESS = process.env['CRYPTO_TEST_PUBLIC_ADDRESS'] || ''

export const SNS_SECRET_KEY = process.env['SNS_SECRET_KEY'] || ''
export const SNS_ACCESS_KEY = process.env['SNS_ACCESS_KEY'] || ''
export const ARN_IOS = process.env['ARN_IOS'] || ''
export const ARN_FCM = process.env['ARN_FCM'] || ''
export const SNS_REGION = process.env['SNS_REGION'] || ''
export const ARN_IOS_TYPE = process.env['ARN_IOS_TYPE'] || ''
export const secret = process.env['secret'] || "qwerty123"

export const kaleyra_voice_api = process.env['kaleyra_voice_api']
export const kaleyra_alert_api = process.env['kaleyra_alert_api']
export const kaleyra_promo_api = process.env['kaleyra_promo_api']