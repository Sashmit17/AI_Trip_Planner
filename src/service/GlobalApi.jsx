
import axios from "axios";

const BASE_URL='https://places.googleapis.com/v1/places:searchText';

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

const cache = new Map();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const GetPlaceDetails = async (data) => {
    const cacheKey = data.textQuery;
    
    if (cache.has(cacheKey)) {
        console.log("Returning cached data for:", cacheKey);
        return cache.get(cacheKey);
    }

    try {
        await delay(1000);  // Add delay before making the API call
        const response = await axios.post(BASE_URL, data, config);
        cache.set(cacheKey, response);  // Store in cache
        return response;
    } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
    }
};

{/*export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config);*/}
export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;