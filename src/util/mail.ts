import { MAIL_KEY, MAIL_SENDER, SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_SSL } from './secrets';
import { setApiKey } from '@sendgrid/mail';
import { createTransport } from 'nodemailer'

setApiKey(MAIL_KEY);


export const sendMail = (payload: IMailMessage) => {

    const {
        to,
        html,
        text,
        subject
    } = payload;
    let secure = false
    if(SMTP_SSL == 'true') {
        secure = true
    }
    let transporter = createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: secure,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    let mailOptions = {
        to,
        html,
        from: MAIL_SENDER,
        text,
        subject
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            global.log('Mail has been sent successfully');
        }
    });

}

export interface IMailMessage {
    to: string;
    subject: string;
    text: string;
    html: string;
}