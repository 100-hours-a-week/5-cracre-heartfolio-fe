import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import ButtomNavigation from "../components/bottomNavigation";
import PopularChart from "../components/popularChart";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Header />
      <div className="mt-[85px]">
      <div className="mx-auto w-[390px] px-3 mt-[34px]">
        <div className="flex justify-around">
          <button className="text-sm" onClick={() => navigate("/portfolio")}>
            <img src="./assets/images/profiles.png" className="size-14 m-3"></img>
            내 포트폴리오
          </button>
          <button className="text-sm" onClick={() => navigate("/ranking")}>
            <img src="./assets/images/ranking.png" className="size-14 m-3"></img>
            랭킹
          </button>
          <button className="text-sm" onClick={() => navigate("/intereststock")}>
            <img src="./assets/images/profits.png" className="size-14 m-3"></img>
            모의투자
          </button>
        </div>
        <div>
            <PopularChart/> 
        </div>
      </div>
      </div>
      <ButtomNavigation />
    </div>
  );
}

export default MainPage;
