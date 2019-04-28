import { createClient } from '@google/maps'
import { GOOGLE_API_KEY } from './secrets'

const googleMapsClient = createClient({ key: GOOGLE_API_KEY, Promise: Promise })

export const autoPlanceSuggestion = async(data) => {
    try {
        let searchTerm = data.searchTerm || ''
        let sessiontoken = Date.now() + ''
        let theResponse = await googleMapsClient.placesAutoComplete({input: searchTerm, sessiontoken}).asPromise()
        // global.log("theResponse: ", theResponse)
        // response.json.results/
        return theResponse
    } catch(err) {
        console.error(err);
        throw new Error(err.message)
    }
}

export const placeDetail = async(data) => {
    try {
        let placeId = data.placeId || ''
        let theResponse = await googleMapsClient.place({ placeid: placeId }).asPromise()
        return theResponse
    } catch(err) {
        console.error(err);
        throw new Error(err.message)
    }
}