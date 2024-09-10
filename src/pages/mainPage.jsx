import { useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import ButtomNavigation from "../components/common/bottomNavigation";
import PopularChart from "../components/main/popularChart";
import { MoneyRankTop3Box } from "../components/ranking/moneyRankBox";
import TitleBox from "../components/commonBox/titleBox";
import NewsBox from "../components/main/newsBox";
import useFetch from "../hooks/useFetch";

function MainPage() {
  const navigate = useNavigate();
  function seeMore(route, tab = 1) {
    navigate(route, { state: { activeTab: tab } });
  }

  const { data, error, loading } = useFetch("https://heartfolio.site/api/news");
  if (loading) {
    return <div className="min-h-screen bg-white text-center">Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-center">
        Error: {error.message}
      </div>
    ); // 에러 발생 시 표시할 내용
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>; // 데이터가 없을 때 표시할 내용
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="py-[70px]">
        <div className="mx-auto w-[390px] px-3">
          <div>
            <TitleBox
              title={"기부 랭킹 TOP3"}
              onClick={() => seeMore("/ranking", 2)}
            />
            <div className="mx-auto max-w-[390px] mt-[6px] border-t border-gray-300" />
            <MoneyRankTop3Box />
            <TitleBox
              title={"오늘의 인기 차트"}
              onClick={() => seeMore("/popularstock")}
            />
            <div className="mx-auto max-w-[390px] mt-[6px] border-t border-gray-300" />
            <PopularChart />
            <TitleBox title={"오늘의 경제 뉴스"} seeMore="none" />
            <NewsBox data={data?.items} />
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </div>
  );
}

export default MainPage;
