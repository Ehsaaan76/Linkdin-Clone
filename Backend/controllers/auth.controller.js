import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password
        } = req.body;

        const existingUsername = await User.findOne({
            username
        });
        const existingEmail = await User.findOne({
            email
        })

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
        res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        return res.status(201).json({
            message: "User registered successfully"
        })

        // Email sending
        profileUrl = process.env.CLIENT_URL + "/profile/" + user.username

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
            email,
            password
        } = req.body;
        const userEmail = await User.findOne({
            email
        });
        const userPassword = await User.findOne({
            password
        });

        if (!userEmail) {

        }

    } catch (error) {

    }
}

export const Logout = (req, res) => {
    res.send("Logout")
}