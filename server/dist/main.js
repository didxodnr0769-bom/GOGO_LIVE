"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // 모든 도메인에서 접근 가능하게 설정
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // 리액트 앱이 실행되는 포트
        methods: ["GET", "POST"],
    },
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/user", userRoute_1.default);
app.use("/chat", chatRoute_1.default);
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
});
let waitQueue = [];
let roomList = [];
const makeClientTime = () => {
    const time = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return time;
};
// 클라이언트 소켓이 연결되었을 때
io.on("connection", (socket) => {
    waitQueue.push({ id: socket.id, socket });
    // 특정 방에 메시지를 보낼 때
    socket.on("message", ({ room, message }) => {
        io.to(room).emit("message", {
            message,
            time: makeClientTime(),
            sender: socket.id,
            type: "normal",
        });
    });
    // 방 입장 성공 시 메시지 수신
    socket.on("success join room", () => {
        socket.emit("message", {
            message: "채팅에 입장되었습니다.",
            time: makeClientTime(),
            sender: "Server",
            type: "notice",
        });
    });
    // disconnect 이벤트 핸들러
    socket.on("disconnecting", () => {
        const disconnectRoom = Array.from(socket.rooms)[1];
        // 연결된 룸이 있을 경우
        if (disconnectRoom) {
            io.to(disconnectRoom).emit("message", {
                message: "상대방이 연결을 종료하였습니다.",
                time: makeClientTime(),
                sender: "Server",
                type: "notice",
            });
            // 룸 제거
            removeRoom(disconnectRoom);
        }
        // 연결된 룸이 없을 경우
        else {
            waitQueue = waitQueue.filter((waitSocketInfo) => waitSocketInfo.socket !== socket);
        }
    });
    // 입력중 상태 수신 및 전달
    socket.on("userTyping", ({ room, isTyping }) => {
        socket.to(room).emit("userTyping", { isTyping, sender: socket.id });
    });
});
const createRoom = (userList) => {
    const roomId = (0, uuid_1.v4)();
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
const removeRoom = (roomId) => {
    const index = roomList.findIndex((room) => room.roomId === roomId);
    roomList.splice(index, 1);
};
// 5초마다 방 생성
setInterval(() => {
    if (waitQueue.length >= 2) {
        const userList = waitQueue.splice(0, 2);
        createRoom(userList);
    }
}, 5000);
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
exports.default = server;
