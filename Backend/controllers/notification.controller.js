import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notification = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image");

    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in getUserNotifications: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const markNotificationAsRead = async (req, res) => {};

export const deleteNotification = async (req, res) => {};
