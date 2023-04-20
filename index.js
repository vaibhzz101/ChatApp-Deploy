const express = require("express");
const app = express();

const {Server} = require("socket.io");
const http = require("http");

const httpServer = http.createServer(app);

httpServer.listen(9000, () => {
    console.log("server is ruinning at port 9000")
});

const io = new Server(httpServer);

const {users} = {};
let count =0;

io.on("connection", (socket) => {
    socket.on("NewUserJoined", (name) => {
      count+=1;
      users[socket.id] = name;
      socket.broadcast.emit("userJoined", name);
      io.emit("userOnline", count);  
    });

    socket.on("send", (message) => {
        socket.broadcast.emit("received", {
            message: message,
            name: users[socket.id]
        });
    });

    socket.on("disconnect", (message) => {
        socket.broadcast.emit("leave", users[socket.id])
        delete users[socket.id];
        count--;
        if(count < 0 ) {
            count = 0;
        }
         io.emit("user online", count)

    });
})