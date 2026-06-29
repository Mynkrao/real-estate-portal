const applicationModel = require("../model/application.model");

async function getAllApplications(req, res){


    try{const application = await applicationModel.find();

    return res.status().json({
        messgae: "Applications fetched successfully",
        application 
    })}
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}



module.exports = { getAllApplications }