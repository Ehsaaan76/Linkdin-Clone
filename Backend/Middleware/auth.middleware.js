import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-linkedin"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid user" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Error in ProtectRoute: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
