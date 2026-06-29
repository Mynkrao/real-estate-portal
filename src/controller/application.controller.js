const applicationModel = require("../model/application.model");
const userModel = require("../model/user.model");

async function applicationController(req, res){
    let { firstName, lastName, email, phoneNo, address, qualification, hasExperience, experienceDetails, jobRole} = req.body;

    if(!firstName || !lastName || !email || !phoneNo || !address || !qualification || !jobRole){
        return res.status(400).json({
            message: "Please fill all the required fields."
        });
    }

    try {

        console.log("Request Body:");
        console.log(req.body);

        console.log("Uploaded Files:");
        console.log(req.files);

        if (!req.files || !req.files.photo || !req.files.resume || !req.files.aadhar) {
            return res.status(400).json({
                message: "Photo, Resume and Aadhar Card are required."
            });
        }

        const photo = req.files.photo[0].path;
        const resume = req.files.resume[0].path;
        const aadhar = req.files.aadhar[0].path;

        const hasPreviousExperience = hasExperience === "true";

        if (!hasPreviousExperience) {
            experienceDetails = "";
        }

        const user = req.user.id;

        const existingApplication = await applicationModel.findOne({
            user: req.user.id
        })

        if(existingApplication){
            return res.status(409).json({
                message: "You have already submitted an application"
            })
        }

        console.log("Creating application...");
        console.log({
            user: user,
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            qualification,
            photo,
            resume,
            aadhar,
            hasExperience: hasPreviousExperience,
            experienceDetails,
            jobRole
        });

        const application = await applicationModel.create({

            user: user,
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            qualification,
            photo,
            resume,
            aadhar,
            hasExperience: hasPreviousExperience,
            experienceDetails,
            jobRole
        });

        console.log("Application saved successfully!");
        console.log(application);

        return res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {

        console.error("DATABASE ERROR:");
        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
}

async function getMyApplication(req, res){

    try{
        const user = req.user.id;
        console.log("Fetching application for user:", user);

        const loggedInUser = await userModel.findById(user).select("email");

        if(!loggedInUser){
            return res.status(404).json({
                message: "User was not found. Please login again."
            })
        }

        const myApplication = await applicationModel.findOne({
            $or: [
                { user },
                { email: loggedInUser.email.toLowerCase() }
            ]
        }).populate("user", "username email");

        if(!myApplication){
            return res.status(404).json({
                message: "No application was found for this user."
            })
        }

        if(myApplication.user?._id?.toString() !== user){
            myApplication.user = user;
            await myApplication.save();
            await myApplication.populate("user", "username email");
        }

        return res.status(200).json({
            message: "Application fetched successfully",
            application: myApplication
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { applicationController, getMyApplication }
