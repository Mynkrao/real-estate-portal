const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "photo"){
            cb(null, "uploads/photos");
        }
        else if(file.fieldname === "resume"){
            cb(null, "uploads/resumes");
        }
        else if(file.fieldname === "aadhar"){
            cb(null, "uploads/aadhar")
        }  
        else{
            cb(new Error("Invalid file field"), false)
        }
    }, 
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.fieldname + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file , cb) => {
    if(file.fieldname === "photo"){
        const allowedTypes = /jpg|jpeg|png/;
        const extension = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if(extension){
            return cb(null, true);
        }else{
            return cb(new Error("Only JPG, JPEG, PNG are allowed for Photo."))
        }
    }
    if(file.fieldname === "resume"){
        if(path.extname(file.originalname).toLowerCase() === ".pdf"){
            return cb(null, true);
        }
        else {
            return cb(new Error("Resume must be a pdf"));
        }
    }
    if(file.fieldname === "aadhar"){
        const allowedTypes = /jpg|jpeg|png|pdf/;
         const extension = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if(extension){
            return cb(null, true);
        }else{
            return cb(new Error("Only JPG, JPEG, PNG, PDF are allowed for Aadhar."))
        }
    }
    
    return cb(new Error("Invalid File"));
} 

const upload = multer({ 
    storage, 
    fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;