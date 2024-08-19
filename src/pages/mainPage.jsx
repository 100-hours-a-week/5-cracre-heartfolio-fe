import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import ButtomNavigation from "../components/bottomNavigation";
import PopularStockBox from "../components/box/popularStockBox";
import PopularChart from "../components/popularChart";

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
        <div className="flex justify-around">
          <button
            className="bg-btnNoClickColor rounded-lg w-[110px] h-[50px] text-sm"
            onClick={() => navigate("/portfolio")}
          >
            내 포트폴리오
          </button>
          <button
            className="bg-btnNoClickColor rounded-lg w-[110px] h-[50px] text-sm"
            onClick={() => navigate("/ranking")}
          >
            랭킹
          </button>
          <button
            className="bg-btnNoClickColor rounded-lg w-[110px] h-[50px] text-sm"
            onClick={() => navigate("/intereststock")}
          >
            모의투자
          </button>
        </div>
        <div>
            <PopularChart/> 
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default MainPage;
