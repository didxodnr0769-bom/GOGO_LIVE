interface JoinRequestProps {
  onRequestJoin: () => void; // 입장 요청,
  isWaiting: boolean; // 방 입장 대기중 여부
}

const JoinRequest = (props: JoinRequestProps) => {
  const { onRequestJoin, isWaiting } = props;
  return (
    <div className="fixed bottom-0 w-screen">
      <button
        className="w-full h-10 text-white bg-gray-50 bg-sky-500"
        onClick={onRequestJoin}
      >
        {isWaiting ? "입장 대기중입니다." : "입장하기"}
      </button>
    </div>
  );
};

export default JoinRequest;
