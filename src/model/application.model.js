const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    },
    firstName: {
        type: String,
        required: [true, "Enter your first name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Enter your last name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter your email address"],
        trim: true,
        lowercase: true,
    },
    phoneNo: {
        type: String,
        required: [true, "Enter your phone number"]
    },
    address: {
        type: String,
        required: [true, "Enter your address"]
    },
    qualification: {
        type: String,
        enum: {
            values:["10th", "12th", "Under-Graduate", "Graduate", "Post Graduate"]
        },
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    aadhar: {
        type : String,
        required: true
    },
    hasExperience: {
        type: Boolean,
        required: true,
        default: false
    },
    experienceDetails: {
        type: String,
        trim: true,
        default: ""
    },
    jobRole: {
        type: String,
        required: [true, "Please select a job role"],
        enum: [
            "Software Developer",
            "Graphic Designer",
            "Relationship Manager",
            "Sales Executive",
            "Sales Manager",
            "Customer Support Executive",
            "Marketing Executive",
            "Digital Marketing Executive",
            "HR Executive",
            "Accountant",
            "Receptionist",
            "Site Engineer",
            "Civil Engineer",
            "Architect",
            "Project Manager",
            "Legal Executive",
            "IT Support",
            "Business Development Executive",
            "Other"
        ]
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    }
},{
    timestamps: true
})

const applicationModel = mongoose.model("application", applicationSchema);
module.exports = applicationModel