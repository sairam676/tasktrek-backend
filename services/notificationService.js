const Notification = require("../models/notificationModel");

const notifyUser=async({io,userId,type,message,data})=>{
    
    //save to DB
    const notification=await Notification.create({
        user:userId,
        type,
        message,
        data,
    })

    //emit in realtime
    io.to(`user:${userId}`).emit("notification:new",{
        id:notification._id,
        type,
        message,
        data,
        createdAt:notification.createdAt,
    });
};

module.exports=notifyUser;