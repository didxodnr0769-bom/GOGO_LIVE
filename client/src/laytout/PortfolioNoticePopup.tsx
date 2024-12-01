interface PortfolioProps {
  onClick: () => void;
}

/**
 * 포트폴리용 프로젝트임을 알리는 팝업 컴포넌트입니다.
 */
const PortfolioNoticePopup = (props: PortfolioProps) => {
  const { onClick } = props;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50   ">
      {/* 배경색  */}
      <div className="w-full h-full bg-slate-500 opacity-50"></div>

      <div className="fixed flex top-0 left-0 w-full h-full justify-center items-center ">
        {/* 팝업 컨텐츠 */}
        <div className="bg-white flex flex-col h-[45vh] w-[90vw] justify-between rounded-lg overflow-hidden">
          <header className="w-full bg-sky-500 p-[10px] text-orange-800">
            <b>경고</b>
          </header>
          <main className="p-[15px] text-center">
            {/* 해당 프로젝트는 포트폴리오용 프로젝트입니다. */}이 프로젝트는{" "}
            <b>포트폴리오 목적</b>으로 제작되었습니다. <br />
            <br />
            실제 서비스가 아니며 일부 기능이 제한되거나 <br />
            데이터가 저장되지 않을 수 있습니다. <br />
            <br /> 이용에 참고 부탁드립니다!
            <br />
          </main>
          <footer className="flex justify-center p-[10px]">
            <div className="">
              <button
                className="w-[100px] bg-sky-500 h-[30px] rounded-lg text-white"
                onClick={onClick}
              >
                <b>확인</b>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioNoticePopup;
