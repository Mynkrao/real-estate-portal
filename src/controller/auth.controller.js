const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

async function registerUser(req, res){
    const {username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Username, Email and Password are required"
        })
    }

    try{
        const isUserAlreadyExists = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })

        if(isUserAlreadyExists){
            return res.status(409).json({
                message: "User Already Exists"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role: "applicant"
        })

        const token = jwt.sign({id: user._id, role:user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d"});
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.status(201).json({
            message: "Registered Successfully",
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

async function loginUser(req, res){
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Email and Password are required"
        })
    }
    
    try{
        const user = await userModel.findOne({
            email
        })

        if(!user){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, { expiresIn: "7d"});
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        console.log("Logged in user:");
        console.log({
            id: user._id,
            role: user.role
        });

        res.status(200).json({
            message: "Logged In Successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

async function logoutUser(req, res){
    const token = req.cookies.token;

    if(!token){
        return res.status(200).json({
            message: "User logout successfully"
        })
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logout successfully"
    })
}

module.exports = { registerUser, loginUser, logoutUser }
