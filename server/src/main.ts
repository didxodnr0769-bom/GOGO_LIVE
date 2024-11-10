import express from "express";
import user from "./routes/userRoute";
import chat from "./routes/chatRoute";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { RoomInterface, UserInterface } from "./interface/userInteface";
import { v4 } from "uuid";

const app = express();
app.use(cors()); // 모든 도메인에서 접근 가능하게 설정
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // 리액트 앱이 실행되는 포트
    methods: ["GET", "POST"],
  },
});

app.use("/user", user);
app.use("/chat", chat);

const waitQueue: UserInterface[] = [];
const roomList: RoomInterface[] = [];

// 클라이언트 소켓이 연결되었을 때
io.on("connection", (socket) => {
  waitQueue.push({ id: socket.id, socket });

  // 특정 방에 메시지를 보낼 때
  socket.on("message", ({ room, message }) => {
    const time = new Date().toLocaleTimeString();
    io.to(room).emit("message", { message, time, sender: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const createRoom = (userList: UserInterface[]) => {
  const roomId = v4();
  const room = {
    roomId,
    users: userList,
  };

  userList.forEach((user) => {
    user.socket.emit("join room", roomId);
    user.socket.join(roomId);
  });
  roomList.push(room);
};

const removeRoom = (roomId: string) => {
  const index = roomList.findIndex((room) => room.roomId === roomId);
  roomList.splice(index, 1);
};

// 5초마다 방 생성
setInterval(() => {
  if (waitQueue.length >= 2) {
    console.log("ytw room...방생성됨", waitQueue.length);
    const userList = waitQueue.splice(0, 2);
    createRoom(userList);
  }
}, 5000);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
