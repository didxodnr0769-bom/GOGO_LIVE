import { io, Socket } from "socket.io-client";
import ChatLayout from "./laytout/ChatLayout";
// import Header from "./laytout/Header";
import Input from "./laytout/Input";
import JoinRequest from "./laytout/JoinRequest";
import { useEffect, useState } from "react";

let socket: Socket | null = null;
function App(): JSX.Element {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState("");
  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  /** 입장 요청 */
  const handleRequestJoin = () => {
    socket = io("http://localhost:3000"); // 서버 주소와 동일하게 설정
    setIsWaiting(true);

    // 방 매칭 완료
    socket.on("join room", (roomId) => {
      setIsWaiting(false);
      setIsJoined(true);
      setRoom(roomId);
      console.log("ytw roomId", roomId);
    });
  };

  /** 메시지 전송 */
  const handleSendMessage = (message: string) => {
    if (socket) {
      socket.emit("message", { message, room });
    }
  };

  return (
    <div id="AppContainer" className="w-screen overflow-hidden">
      {isJoined && socket ? (
        <ChatLayout socket={socket} />
      ) : (
        <JoinRequest isWaiting={isWaiting} onRequestJoin={handleRequestJoin} />
      )}
      <Input onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
