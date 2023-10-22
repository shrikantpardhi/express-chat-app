import express, { Application, Request, Response, Router } from "express";
import { routes } from "./src/routes";
import { Server } from "socket.io";
import * as http from "http";
import dayjs from "dayjs";

const app: Application = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile("/index.html");
});

// socket connections
io.on("connection", (socket) => {
  socket.on("join", (option) => {
    console.log(option);
    socket.join(option.chatname);
    socket.to(option.chatname).emit("notification", option);
  });

  // send message
  socket.on("sendMessage", (option) => {
    console.log(option);
    let $message: Message = {
      user: option.username,
      text: option.message,
      timestamp: dayjs().format("HH:mm"),
    };
    socket.to(option.chatname).emit("updateChat", $message);
  });

  // disconnect the user
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// start the server
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

type Message = {
  user: string;
  text: string;
  timestamp: any;
};
