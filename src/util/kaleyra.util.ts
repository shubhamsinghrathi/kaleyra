import * as fetch from 'node-fetch'
import { kaleyra_voice_api, kaleyra_promo_api, http_options } from '.'

/**
 * sendMessage
 * Used to send the messages to other users
 * @param data 
 */
export const sendMessage = async (data:SendMessage) => {
    try {
        data.toNumber = data.toNumber || [];
        let toNumber = "";
        data.toNumber.map(val => {
            toNumber += val + ",";
        });
        if(toNumber == "") {
            return { failed: false, status: "Success" };
        }
        let url = `https://api-promo.kaleyra.com/v4/?api_key=${kaleyra_promo_api}&method=sms&message=${data.message}&to=${toNumber}&sender=BULKSMS`;
        global.log("url: ", url);
        let options = http_options({ type: "POST" })
        const response = await fetch(url, options);
        let theData = await response.json();
        global.log("theData: ", theData);
        if(theData.status == "OK") {
            return { failed: false, status: "Success" };
        } else {
            return { failed: true, status: "Failed" };
        }
    } catch(err) {
        global.log("Error in sendMessage: ", err);
        return { failed: true };
    }
}

/**
 * makeCall
 * Used to make the call to other users
 * @param data 
 */
export const makeCall = async (data:CallMessage) => {
    try {
        data.toNumber
        data.fromNumber
        let url = `https://api-voice.kaleyra.com/v1/?api_key=${kaleyra_voice_api}&method=dial.click2call&format=json&caller=${data.fromNumber}&receiver=${data.toNumber}`;
        global.log("url: ", url);
        let options = http_options({ type: "GET" })
        const response = await fetch(url, options);
        let theData = await response.json();
        global.log("theData: ", theData);
        if(theData.status == "200") {
            return { failed: false, status: "Success" };
        } else {
            return { failed: true, status: "Failed" };
        }
    } catch(err) {
        global.log("Error in makeCall: ", err);
        return { failed: true };
    }
}