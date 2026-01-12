const express = require("express");
const router = express.Router();
const {getNotifications,markNotificationRead,markAllNotificationRead}=require("../controllers/notificationController");
const {protect}=require("../middlewear/authMiddlewear");


router.get("/",protect,getNotifications);

//mark one notification read
router.patch("/:id/read",protect,markNotificationRead);

//mark all notification as read
router.patch("/read-all",protect,markAllNotificationRead);

module.exports=router;