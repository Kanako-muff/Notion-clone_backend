const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true, //don't allow to skip setting "username"
        unique: true, //don't allow to set a same "username"
    },
    password:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);