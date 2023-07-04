const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memoSchema = new Schema({
    user: {
        // ⬇︎Info is from models/user.js
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    icon: {
        type: String,
        default: "📝",
    },
    title: {
        type: String,
        default: "new memo",
    },
    description: {
        type: String,
        default: "Write your memo here.",
    },
    position: {
        type: Number,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    favoritePosition: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Memo", memoSchema);