require ('dotenv').config();
const app = require("./app");
const connectToDB = require("./src/config/db")

connectToDB();

app.listen(3001, ()=> {
    console.log("Server is running on port 3001")
})