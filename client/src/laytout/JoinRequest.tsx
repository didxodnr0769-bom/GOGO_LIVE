interface JoinRequestProps {
  onRequestJoin: () => void; // 입장 요청
  isWaiting: boolean; // 입장 대기중
}

const JoinRequest = (props: JoinRequestProps) => {
  const { onRequestJoin, isWaiting } = props;
  return (
    <div className="">
      {isWaiting ? (
        <>입장중입니다....</>
      ) : (
        <button onClick={onRequestJoin} type="button">
          입장
        </button>
      )}
    </div>
  );
};

export default JoinRequest;
