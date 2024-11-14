interface HeaderProps {
  isJoined: boolean; // 방 입장 완료 여부
  handleRequestExit: () => void; // 방 나가기 요청
}

/**
 * 헤더 컴포넌트
 */
const Header = (props: HeaderProps) => {
  const { isJoined, handleRequestExit } = props;
  return (
    <div className="fixed top-0 w-screen z-10">
      <div className="flex justify-between h-[50px] py-2 px-3 bg-sky-500 font-bold">
        {/* <div>고고 라이브</div> */}
        <LogoComponent />
        {isJoined && <ExitComponent onClick={handleRequestExit} />}
      </div>
    </div>
  );
};

/**
 * 로고 컴포넌트
 */
const LogoComponent = () => {
  return (
    <div className="text-white font-bold flex items-center">고고 라이브</div>
  );
};

/** 나가기 컴포넌트 */
const ExitComponent = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <div className="text-white font-bold flex items-center" onClick={onClick}>
      나가기
    </div>
  );
};

export default Header;
