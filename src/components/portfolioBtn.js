function PortfolioBtn() {
  return (
    <div className="mx-auto max-w-[370px] bg-backColor mt-[34px] h-[1200px]">
      <div className="flex h-[70px] items-center justify-center">
        <button className="w-[120px] h-[64px] hover:bg-btnClickColor rounded">
          자산 구성
        </button>
        <button className="w-[120px] h-[64px] hover:bg-btnClickColor rounded">
          거래 내역
        </button>
        <button className="w-[120px] h-[64px] hover:bg-btnClickColor rounded">
          보유 자산
        </button>
      </div>
      <div className="flex">
        <div></div>
      </div>
    </div>
  );
}

export default PortfolioBtn;
