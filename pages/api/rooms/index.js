import connectMongo from '../../../database/conn'
import { getRooms, postRoom, putRoom, deleteRoom } from '../../../database/controllerRoom';


export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection"}))

    // type of request
    const { method } = req

    switch(method){
        case 'GET' :
            getRooms(req, res)
            break;
        case 'POST':
            postRoom(req, res)
            break;
        case 'PUT':
            putRoom(req, res)
            break;
        case 'DELETE':
            deleteRoom(req, res)
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowd`)
            break;
    }
  }
  