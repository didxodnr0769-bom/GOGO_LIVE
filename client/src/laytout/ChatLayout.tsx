import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatLayoutProps {
  socket: Socket;
}

interface Chat {
  message: string;
  sender: string;
  time: string;
  type?: string;
}

const ChatLayout = (props: ChatLayoutProps) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { socket } = props;
  useEffect(() => {
    socket.on("message", (chat: Chat) => {
      setChatList((prev) => [...prev, chat]);
    });
    return () => {
      socket.off("message");
    };
  }, []);
  return (
    <>
      {chatList.map((chat) => {
        if (chat.type === "notice") {
          return NoticeChat(chat.message);
        } else if (chat.sender === socket.id) {
          return MyChat(chat.message);
        } else {
          return OtherChat(chat.message);
        }
      })}
    </>
  );
};

export default ChatLayout;

/** 공지 메세지 */
const NoticeChat = (message: string) => {
  return (
    <div className="w-full flex justify-center">
      <div>----{message}----</div>
    </div>
  );
};

/** 내가 보낸 메시지 컴포넌트 */
const MyChat = (message: string) => {
  return (
    <div className="w-full flex justify-end">
      <div
        className="w-max m-2 px-4 py-2 break-words text-white rounded-2xl rounded-br-none bg-pink-500 "
        style={{
          maxWidth: "70%",
        }}
      >
        {message}
      </div>
    </div>
  );
};

/** 상대가 보낸 메시지 컴포넌트 */
const OtherChat = (message: string) => {
  return (
    <div className="w-full flex justify-start">
      <div
        className="w-max max-w-sm m-2 px-4 py-2 break-words rounded-2xl rounded-bl-none bg-gray-200 "
        style={{
          maxWidth: "70%",
        }}
      >
        {message}
      </div>
    </div>
  );
};
