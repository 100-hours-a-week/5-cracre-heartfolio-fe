import { useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import ButtomNavigation from "../components/common/bottomNavigation";
import PopularChart from "../components/main/popularChart";
import { MoneyRankTop3Box } from "../components/ranking/moneyRankBox";
import TitleBox from "../components/commonBox/titleBox";

function MainPage() {
  const navigate = useNavigate();
  function seeMore(route, tab = 1) {
    navigate(route, { state: { activeTab: tab } });
  }
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-[50px]">
        <div className="mx-auto w-[390px] px-3">
          <div>
            {/* <TitleBox
              title={"기부 랭킹 TOP3"}
              onClick={() => seeMore("/ranking", 2)}
            />
            <div className="mx-auto max-w-[390px] mt-[6px] border-t border-gray-300" />
            <MoneyRankTop3Box /> */}
            <TitleBox
              title={"오늘의 인기 차트"}
              onClick={() => seeMore("/popularstock")}
            />
            <div className="mx-auto max-w-[390px] mt-[6px] border-t border-gray-300" />
            <PopularChart />
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </div>
  );
}

export default MainPage;
