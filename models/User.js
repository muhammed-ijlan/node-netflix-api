const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: ture,
})

module.exports = mongoose.model("User", UserSchema)