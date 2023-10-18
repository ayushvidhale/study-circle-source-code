import { Schema, models, model } from "mongoose";

const roomSchema = new Schema({
    id: String,
    name: String,
    adminUser: Object,
    logo: String,
    description: String,
    status: String,
    members: Array,
    tags: Array,
    topic: String,
    createdAt: String,
    views: Number,
    files: Array,
    links: Array,
    tasks: Array,
    milestones: Array,
    notes: Array,
    chats: Array,
    events: Array,
    visibility: String,
   
});

const Rooms = models?.room || model('room', roomSchema)

export default Rooms;