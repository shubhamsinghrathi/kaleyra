import * as fetch from 'node-fetch'
import { http_options } from '.';

//req.connection.remoteAddress

export const ipToLocation = async (data) => {
    let ip = data.ip || ''
    let url = 'http://ip-api.com/json/' + ip
    let options = http_options({ normal: true })
    const response = await fetch(url, options)
    let theData = await response.json();

    return {
        lat: theData.lat || 0.0,
        long: theData.lon || 0.0
    }
}