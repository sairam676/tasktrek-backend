const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http =require('http');
const {Server}=require('socket.io');
const socketAuth=require("./sockets/socketAuth");
const onlineUsers=new Map();

dotenv.config();
connectDB();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/tasks',require('./routes/taskRoutes'));
app.use('/api/notifications',require('./routes/notificationRoutes'));
const { errorHandler } = require('./middlewear/errorMiddleware');
app.use(errorHandler);

//create HTTP server
const server=http.createServer(app);

//attach socket.io to server
const io=new Server(server,{
  cors:{
    origin:'*',
    method:["GET",'POST']
  }
});

//to make io availbe everywhere
app.set("io",io);

io.use(socketAuth);

//Socket connection
io.on("connection", (socket) => {
const userId=socket.user.id;

//join user room
socket.join(`user:${userId}`);
console.log(`user: ${userId} joined their room`)

//presence of user online
if(!onlineUsers.has(userId)){
  onlineUsers.set(userId,new Set());
}

onlineUsers.get(userId).add(socket.id);

io.to(`user:${userId}`).emit("presence:online",{
  userId,
});

console.log("ONLINE USERS:", [...onlineUsers.keys()]);
   
//presence list req
   socket.on("presence:get",()=>{
    socket.emit("presence:list",{
      users:[...onlineUsers.keys()],
    })
   })

//to join task room 
socket.on("join:task",({taskId})=>{
  socket.join(`task:${taskId}`);
  console.log(`user ${socket.user.id} joined task ${taskId}`)
});



//disconnect
  socket.on("disconnect", () => {
    const sockets=onlineUsers.get(userId);
    if(sockets){
      sockets.delete(socket.id);

      if(sockets.size===0){
        onlineUsers.delete(userId);
      
     io.to(`user:${userId}`).emit("presence:offline",{
      userId,
     });}
    }
    console.log("ONLINE USERS:", [...onlineUsers.keys()]);
    console.log("socket disconnected:", userId);
  });
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});