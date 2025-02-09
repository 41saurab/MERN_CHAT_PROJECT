import http from "http";
import application from "./src/config/express-config.js";
import dotenv from "dotenv";

import { Server } from "socket.io";

dotenv.config();

const appServer = http.createServer(application);

const io = new Server(appServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.on("newMessage", (data) => {
        // Emit the message to all users including the sender
        socket.emit("newMessageReceived", data); // Send to sender
        socket.broadcast.emit("newMessageReceived", data); // Broadcast to other users
    });
});

appServer.listen(process.env.PORT, process.env.SERVER, (error) => {
    if (!error) {
        console.log(`Server listening on ${process.env.PORT}`);
    } else {
        console.log("Error connecting to server");
    }
});
