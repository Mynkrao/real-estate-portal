const express = require("express");
const applicationController = require("../controller/application.controller");
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../config/multer");

const router = express.Router();

router.post("/", authMiddleware ,upload.fields([

    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "aadhar", maxCount: 1 }

]),applicationController.applicationController);

router.get("/my-application", authMiddleware, applicationController.getMyApplication);
module.exports = router;