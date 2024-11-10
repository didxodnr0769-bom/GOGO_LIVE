import express from "express";
import user from "./routes/userRoute";
import chat from "./routes/chatRoute";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

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
// 클라이언트 소켓이 연결되었을 때
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 클라이언트로부터 방 입장 요청을 받았을 때
  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // 특정 방에 메시지를 보낼 때
  socket.on("chat message", ({ room, message }) => {
    io.to(room).emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
