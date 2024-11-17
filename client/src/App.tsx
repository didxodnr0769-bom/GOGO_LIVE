import { io, Socket } from "socket.io-client";
import ChatLayout from "./laytout/ChatLayout";
import Input from "./laytout/Input";
import { useEffect, useRef, useState } from "react";
import Header from "./laytout/Header";
import JoinRequest from "./laytout/JoinRequest";

let socket: Socket | null = null;
function App(): JSX.Element {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
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
    });
  };

  /** 메시지 전송 */
  const handleSendMessage = (message: string) => {
    if (socket) {
      socket.emit("message", { message, room });

      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 10);
    }
  };

  const handleRequestExit = () => {
    if (socket) {
      socket.disconnect();
      setIsJoined(false);
      socket = null;
    }
  };

  return (
    <div id="AppContainer" className="w-screen overflow-hidden">
      <Header isJoined={isJoined} handleRequestExit={handleRequestExit} />
      <div
        id="test"
        ref={chatRef}
        className="relative max-w-md "
        style={{
          marginTop: "50px",
          paddingBottom: "20px",
          height: "calc(100vh - 90px)",
          overflowY: "scroll",
        }}
      >
        {socket && isJoined && <ChatLayout socket={socket} chatRef={chatRef} />}
      </div>
      {isJoined ? (
        <Input onSendMessage={handleSendMessage} isJoined={isJoined} />
      ) : (
        <JoinRequest onRequestJoin={handleRequestJoin} isWaiting={isWaiting} />
      )}
    </div>
  );
}

export default App;
