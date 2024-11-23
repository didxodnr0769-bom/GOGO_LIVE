import { useEffect, useState } from "react";

interface InputProps {
  onSendMessage: (message: string) => void; // 메시지 전송 이벤트
  onSendTyping: (isTyping: boolean) => void; // 타이핑 전송 이벤트
  isJoined: boolean; // 방 입장 완료 여부
}

/**
 * 레이아웃 하단 입력창 컴포넌트입니다.
 * @returns
 */
const Input = (props: InputProps) => {
  const [message, setMessage] = useState("");
  const { onSendMessage, isJoined, onSendTyping } = props;
  const [isTyping, setIsTyping] = useState(false);

  // 메세지 입력 시 타이핑 상태 변경
  useEffect(() => {
    setIsTyping(message.length > 0);

    const interval = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [message]);

  // 타이핑 상태 변경 시 서버 전송
  useEffect(() => {
    onSendTyping(isTyping);
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!message) return;
    onSendMessage(message);
    setMessage("");
    setIsTyping(false);
  };

  const placeholder = isJoined
    ? "메세지를 입력해주세요."
    : "입장을 요청해주세요.";

  return (
    <div className="fixed bottom-0 w-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex items-end py-2 px-3 bg-gray-50 dark:bg-gray-700">
          <input
            type="text"
            id="chat"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isJoined}
          ></input>
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={handleSendMessage}
            disabled={!isJoined}
          >
            <svg
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Input;
