const Notification = require("../models/notificationModel");
const asyncHandler=require("express-async-handler");

const getNotifications=asyncHandler(async(req,res)=>{
const notifications=await Notification.find({user:req.user._id})
.sort({createdAt:-1});

res.json(notifications);
});

//@desc notification read
//@route PATCH /api/notifications/:id/read
//@access private
const markNotificationRead=asyncHandler(async(req,res)=>{
    const notification=await Notification.findById(req.params.id);

    if(!notification){
        res.status(404);
        throw new Error("Notiifcation not found");
    }

    //ownership check
    if(notification.user.toString()!==req.user._id.toString()){
        res.status(401);
        throw new Error("Not authorized");
    }

    if(!notification.read){
        notification.read=true;
        await notification.save();
    }

    res.json(notification);
});

const markAllNotificationRead=asyncHandler(async(req,res)=>{
    await Notification.updateMany(
        {user:req.user._id,read:false},
            {read:true}
    );
    res.json({success:true});
})
module.exports={getNotifications,markNotificationRead,markAllNotificationRead};