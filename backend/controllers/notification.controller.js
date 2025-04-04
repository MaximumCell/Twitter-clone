import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ error: "Internel server error" });
  }
};

export const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const notificationId = await Notification.findById(req.params.id);
        if (!notificationId) {
            return res.status(404).json({ error: "Notification not found" });
        }
        if (notificationId.to.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Forbidden: You do not have permission to delete this notification" });
        }
        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notification deleted successfully" });

    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ error: "Server error" });
        
    }
}