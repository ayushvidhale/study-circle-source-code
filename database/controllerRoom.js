
/** Controller */
import Rooms from "@/model/room"

// get : http://localhost:3000/api/rooms
export async function getRooms(req, res){
    try {
        const rooms = await Rooms.find({})

        if(!rooms) return res.status(404).json( { error: "Data not Found"})
        return res.status(200).json(rooms)
    } catch (error) {
        return res.status(404).json( { error : "Error While Fetching Data"})
    }
}

// get : http://localhost:3000/api/rooms/1
export async function getRoom(req, res){
    try {
        const { roomId } = req.query;

        if(roomId){
            const room = await Rooms.findById(roomId);
            return res.status(200).json(room)
        }
        return res.status(404).json({ error : "Room not Selected...!"});
    } catch (error) {
        return res.status(404).json({ error: "Cannot get the Room...!"})
    }
}

// post : http://localhost:3000/api/rooms
export async function postRoom(req, res){
    try {
        const formData = req.body;
        if(!formData) return res.status(404).json( { error: "Form Data Not Provided...!"});
        Rooms.create( formData, function(err, data){
            console.log(err, data)
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json({ error })
    }
}

// put : http://localhost:3000/api/rooms/1
export async function putRoom(req, res){
    try {
        const { roomId } = req.query;
        const formData = req.body;

        if(roomId && formData){
            const room = await Rooms.findByIdAndUpdate(roomId, 
                { $set: formData },
                );
            return res.status(200).json(room)
        }
        return res.status(404).json( { error: "Room Not Selected...!"})
    } catch (error) {
        return res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}

// delete : http://localhost:3000/api/rooms/1
export async function deleteRoom(req, res){
    try {
        const { roomId } = req.query;

        if(roomId){
            const room = await Rooms.findByIdAndDelete(roomId)
            return res.status(200).json(room)
        }

        return res.status(404).json({ error: "Room Not Selected...!"})

    } catch (error) {
        return res.status(404).json({ error: "Error While Deleting the Room...!"})
    }
}