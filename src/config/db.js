const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to Database.")
    })
    .catch((error)=>{
        console.log("Error Connecting to Database")
    })
}

module.exports = connectToDB