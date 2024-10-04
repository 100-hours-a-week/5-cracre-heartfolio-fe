import { useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import ButtomNavigation from "../components/common/bottomNavigation";
import PopularChart from "../components/main/popularChart";
import { MoneyRankTop3Box } from "../components/ranking/moneyRankBox";
import LuckyBox from "../components/main/luckyBox";
import TitleBox from "../components/commonBox/titleBox";
import NewsBox from "../components/main/newsBox";
import useFetch from "../hooks/useFetch";
import TradingViewMini from "../components/main/tradingViewMini";
import { Loading } from "../components/common/loading";
import MyLuck from "../components/main/myLuck";

function MainPage() {
  const navigate = useNavigate();
  function seeMore(route, tab = 1) {
    navigate(route, { state: { activeTab: tab } });
  }
  const { data: moneyData, moneyLoading } = useFetch(
    `${process.env.REACT_APP_API_URI}/rank/donation`
  );
  const { data, error, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/news`
  );

  const {
    data: fortuneData,
    error: fortuneError,
    loading: fortuneLoading,
  } = useFetch(`${process.env.REACT_APP_API_URI}/fortune`);

  // 운세 데이터 확인
  const hasSeenLuck = fortuneData && fortuneData !== ""; // 운세를 확인한 경우

  // 데이터 구조가 유효한지 확인
  const userRanking = moneyData?.userRanking || [];

  // 상위 3개 아이템 추출
  const topThree = userRanking.slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="py-[70px]">
        <div className="mx-auto w-[390px] px-3">
          {loading || moneyLoading ? (
            <Loading />
          ) : error ? (
            <div className="min-h-screen bg-white text-center">
              Error : {error.message}
            </div>
          ) : !data ||
            data.length === 0 ||
            !moneyData ||
            moneyData.length === 0 ? (
            <div className="text-center pt-5"> No data available</div>
          ) : (
            <div>
              {hasSeenLuck ? (
                <MyLuck data={fortuneData} ok={true} loading={fortuneLoading}/>
              ) : (
                <LuckyBox />
              )}
              <TitleBox
                title={"기부 랭킹 TOP3"}
                onClick={() => seeMore("/ranking", 2)}
              />
              <div className="mx-auto max-w-[390px] mt-[6px] border-t border-gray-300" />
              <MoneyRankTop3Box topThree={topThree} main={true} />
              <div className="mx-auto max-w-[390px] mt-10 border-t border-gray-300" />
              <div className="flex justify-around w-[370px] mt-4 pb-3 bg-gray-100">
                <div className="w-[175px] aspect-[7/8]">
                  <div className="text-left font-bold pt-2 mb-2">
                    S&P 500 (SPY ETF)
                  </div>
                  <TradingViewMini symbol={"AMEX:SPY"} />
                </div>
                <div className="w-[175px] aspect-[7/8]">
                  <div className="text-left font-bold pt-2 mb-2">나스닥</div>
                  <TradingViewMini symbol={"NASDAQ.USD.100"} />
                </div>
              </div>
              <TitleBox
                title={"오늘의 인기 차트"}
                onClick={() => seeMore("/popularstock")}
              />
              <div className="mx-auto max-w-[390px] mt-[6px] border-t border-gray-300" />
              <PopularChart />
              <TitleBox title={"오늘의 경제 뉴스"} seeMore="none" />
              <NewsBox data={data?.items || []} />
            </div>
          )}
        </div>
      </div>
      <ButtomNavigation />
    </div>
  );
}

export default MainPage;
