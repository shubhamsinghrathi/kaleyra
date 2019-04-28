import * as moment from 'moment';

export const mile2meter = (val: number) => {
    return val * 1609.34;
}

export const meter2mile = (val: number) => {
    return val / 1609.34;
}

//checks if otp is expired or not
export const checkOtpExpiry = (time: Date): boolean => {
    if (moment().isBefore(moment(time))) return true;
    else return false;
}

export const randomStringGenerator = (val: number) => {
    var str = "";
    var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //Random number generator to create accessToken
    for (var i = 0; i < val; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str;
}

export const createGeoLocationObject = (location, redius) => {
    let searchObject = {
        $geoNear: {
        near: {
            coordinates: location
        },
        spherical: true,
        maxDistance: redius || 10000000000,
        distanceField: "distance"
        }
    };
    return searchObject;
}

export const http_options = (data) => {
    let type = data.type || 'GET'
    let body = data.body || {}
    let token = data.token || ''
    let normal = data.normal || false

    if(!normal) {
        return {
            method: type,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, body }
        }
    } else {
        return {
            method: type
        }
    }
}