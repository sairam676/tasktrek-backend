const socket=require("./socket");


socket.on("connect",()=>{
    console.log("connected to socket server");
    socket.emit("join:project",{
        projectId:"socket.user.id",
    });
});

socket.on("task:created",(data)=>{
    console.log("task created",data);
});

socket.on("task:updated",(data)=>{
    console.log("task updated",data);
});

socket.on("task:deleted",(data)=>{
    console.log("task deleted",data);
});

socket.on("presence:online",({userId})=>{
     console.log(`🟢 user online: ${userId}`);
})

socket.on("presence:offline",({userId})=>{
     console.log(`🟢 user online: ${userId}`);
})

socket.emit("presence:get");

socket.on("presence:list",({users})=>{
    console.log("online users:",users)
})

socket.on("notification:new",(notification)=>{
    console.log("NEW NOTIFICATION:",notification);
})

socket.on("task:assigned",({taskId})=>{
    console.log("assigned to task",taskId);

    socket.emit("join:task",{taskId});
})