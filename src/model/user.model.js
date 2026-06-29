const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: [true, "Enter valid email address"],
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "applicant"],
        default: "applicant"
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel