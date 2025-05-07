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

export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const notification = await Notification.findByIdAndUpdate(
      {_id: notificationId, recipient: res.user._id},
      {read: true},
      {new: true}
    );

    res.status(200).json(notification)
  } catch (error) {
    console.log("Error in markNotificationAsRead: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  try {
    await Notification.findOneAndDelete(
      {_id: notificationId, recipient: req.user._id}
    );
    res.json({ message: "Notification delete successfully" })
  } catch (error) {
    console.log("Error in deleteNotification: ", error);
    res.status(200).json({ message: "Internal Server error" })
  }
};
