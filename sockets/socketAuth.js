const jwt = require("jsonwebtoken");
const { Socket } = require("socket.io");

const socketAuth=(socket,next)=>{
    try{
        const token = socket.handshake.auth.token;
        if(!token){
            return next(new Error("no token provided"));
        }
      const decoded=jwt.verify(token,process.env.JWT_SECRET);

      socket.user={
        id:decoded.id,
        email:decoded.email,
      };

      next();
    }catch(err){
next(new Error("invalid token"));
    }
};

module.exports = socketAuth;