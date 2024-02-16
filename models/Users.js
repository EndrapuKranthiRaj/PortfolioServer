const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        Thumbnail_link: String,
        description: String,
        date: String
    }
)

const UserModel = mongoose.model("allprojects",UserSchema)
module.exports = UserModel