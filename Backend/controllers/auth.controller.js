import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    sendWelcomeEmail
} from "../emails/emailHandlers.js";

export const Signup = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password
        } = req.body;

        const existingEmail = await User.findOne({
            email
        })

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const existingUsername = await User.findOne({
            username
        });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "Fill all the fields"
            });
        }


        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword
        })

        await user.save();

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });

        await res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(201).json({
            message: "User registered successfully"
        })

        console.log("User Registered Successfully");


        // Email sending
        const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username


        try {
            await sendWelcomeEmail(user.email, user.name, profileUrl)
        } catch (error) {
            console.error("Error Sending Welcome Email", error)
        }

    } catch (error) {
        console.log("Error in Signup: " + error.message);
        res.status(500).json({
            message: "Internal server error"
        });

    }
}

export const Login = async (req, res) => {
    try {

        const {
            username,
            password
        } = req.body;
    
        const user = await User.findOne({
            username
        });
    
        if (!user) {
            return res.status(400).json({
                message: "Username doesn't exist!"
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong Password!"
            })
        }
    
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });
    
        await res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })
    
        res.json({ message: "Logged in successfully"})
    
    } catch (error) {
       console.error("Error in Login Controller", error);
       res.status(500).json({ message: "Server error!"}) 
    }
}
export const Logout = (req, res) => {
    res.clearCookie("jwt-linkedin");
    res.json({
        message: "Logged Out Successfully"
    });
}