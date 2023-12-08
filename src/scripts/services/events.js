import { baseUrl } from "../variables.js"

async function getEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=5`)
    return await response.json()
}

export {getEvents}