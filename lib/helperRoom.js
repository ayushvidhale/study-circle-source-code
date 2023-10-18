
const BASE_URL = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://finding-ally-web.vercel.app'

export const getRooms = async () => {
    const response = await fetch(`${BASE_URL}/api/rooms`)
    const json = await response.json()

    return json;
}

// single PROJECT
export const getRoom = async (roomId) => {
    const response = await fetch(`${BASE_URL}/api/rooms/${roomId}`);
    const json = await response.json()

    if(json) return json;
    return {}
}

// posting a new PROJECT
export async function addRoom(formData){
    try{
        const Options = {
            method : 'POST',
            headers : { 'Content-Type': "application/json", 'Accept': "application/json"},
            body: JSON.stringify(formData)
        }
        
        const response = await fetch(`${BASE_URL}/api/rooms`, Options)
        const json = await response.json()

        return json;
    }catch(error){
        return error;
    }
}


// Update a new PROJECT
export async function updateRoom(roomId, formData){
    const Options = {
        method : 'PUT',
        headers : { 'Content-Type': "application/json"},
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}/api/rooms/${roomId}`, Options)
    const json = await response.json()
    return json;
}


// Delete a new PROJECT
export async function deleteRoom(roomId){
    const Options = {
        method : 'DELETE',
        headers : { 'Content-Type': "application/json"},
    }

    const response = await fetch(`${BASE_URL}/api/rooms/${roomId}`, Options)
    const json = await response.json()
    return json;
}