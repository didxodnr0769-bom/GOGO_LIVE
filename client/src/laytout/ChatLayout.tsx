import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatLayoutProps {
  socket: Socket;
}

interface Chat {
  message: string;
  sender: string;
  time: string;
}

const ChatLayout = (props: ChatLayoutProps) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { socket } = props;
  useEffect(() => {
    socket.on("message", (chat: Chat) => {
      console.log("ytw chat", chat, chatList, socket.id);
      setChatList((prev) => [...prev, chat]);
    });
    return () => {
      socket.off("message");
    };
  }, []);
  return (
    <div className="mx-auto my-[70px] relative max-w-md ">
      {chatList.map((chat) => {
        if (chat.sender === socket.id) {
          return MyChat(chat.message);
        } else {
          return OtherChat(chat.message);
        }
      })}
    </div>
  );
};

export default ChatLayout;

const MyChat = (message: string) => {
  return (
    <div className="w-max max-w-sm m-4 px-4 py-2 text-white rounded-2xl rounded-br-none bg-pink-500">
      {message}
    </div>
  );
};

const OtherChat = (message: string) => {
  return (
    <div className="w-max max-w-sm m-4 px-4 py-2 rounded-2xl rounded-bl-none bg-gray-200">
      {message}
    </div>
  );
};
