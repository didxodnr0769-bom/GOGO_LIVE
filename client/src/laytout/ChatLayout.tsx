import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Chat } from "../interface/Chat";
import { SUCCESS_JOIN_ROOM_KEY } from "../constants/Message";

interface ChatLayoutProps {
  socket: Socket;
  chatRef: React.RefObject<HTMLDivElement>;
}

const ChatLayout = (props: ChatLayoutProps) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { socket, chatRef } = props;
  useEffect(() => {
    // 룸 진입 완료 메세지 발신
    socket.emit(SUCCESS_JOIN_ROOM_KEY);
    socket.on("message", (chat: Chat) => {
      setChatList((prev) => [...prev, chat]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }
  }, [chatList]);
  return (
    <>
      {chatList.map((chat) => {
        if (chat.type === "notice") {
          return NoticeChat(chat.message);
        } else if (chat.sender === socket.id) {
          return MyChat(chat);
        } else {
          return OtherChat(chat);
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
const MyChat = (chat: Chat) => {
  const { message, time } = chat;
  return (
    <div className="w-full flex justify-end">
      <div className="flex items-end pb-3 text-xs">{time}</div>
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
const OtherChat = (chat: Chat) => {
  const { message, time } = chat;
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
      <div className="flex items-end pb-3 text-xs">{time}</div>
    </div>
  );
};
