import { useEffect } from "react";
import ChatLayout from "./laytout/ChatLayout";
import Header from "./laytout/Header";
import Input from "./laytout/Input";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000"); // 서버 주소와 동일하게 설정
function App(): JSX.Element {
  useEffect(() => {
    // 서버로부터 메시지를 수신할 때
    // socket.on("message", (message: string) => {
    //   // setMessages((prevMessages) => [...prevMessages, message]);
    // });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div id="AppContainer" className="w-screen overflow-hidden">
      <Header />
      <ChatLayout></ChatLayout>
      <Input />
    </div>
  );
}

export default App;
