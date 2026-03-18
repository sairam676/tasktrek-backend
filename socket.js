const { io } = require("socket.io-client");

const token =process.env.JWT_SECRET

const socket = io("http://localhost:5050", {
 auth:{
  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NThhNjg4ODVhM2U5ZWFhNTQ3Nzc0YSIsImlhdCI6MTc2ODIzMDU4OSwiZXhwIjoxNzcwODIyNTg5fQ._cRfO47CAc456t3iaKr3XCnuYkEvyywiOGU6CwWsuw0",
 },
});

module.exports = socket;
