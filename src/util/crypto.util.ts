import { createHmac, createCipher, createDecipher } from 'crypto';
import { SALT, ENC } from './secrets';

export const hashPassword = (text) => {
    return new Promise((resolve, reject) => {
        const hash = createHmac('sha256', SALT);
        hash.update(text.toString());
        resolve(hash.digest('hex'));
    })
}

export const encryptData = (text: string) => {
    try {
        const cip = createCipher('aes192', ENC);
        let encrypted = cip.update(text.toString(), 'utf8', 'hex');
        encrypted += cip.final('hex');
        global.log(encrypted);
        return encrypted;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const decryptedData = (encrypted: string) => {
    try {
        const decipher = createDecipher('aes192', ENC);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        global.log(decrypted);
        return decrypted;
    } catch (err) {
        console.error(err);
        return null;
    }

}


