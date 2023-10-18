import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    id: String,
    name: String,
    login: String,
    image: String,
    about: String,
    email: String,
    age: Number,
    personalityTraits: Array,
    gender: String,
    language: String,
    goals: String,
    studyHabits: String,
    major: String,
    interests: Array,
    cocurricularInterests: Array,
    availibility: Array,
    subsciption: String,
    isPortfolioCreated: String,
});

const Users = models.user || model('user', userSchema)

export default Users;