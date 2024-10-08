import { useEffect, useState } from "react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import UserRanking from "../components/ranking/userRanking";
import Lottie from "lottie-react";
import ContructionAnimation from "../assets/animations/construction.json";
import MoneyRanking from "../components/ranking/moneyRanking";
import { useLocation } from "react-router-dom";

function RankingPage() {
  // activeTab이 없을 때 기본값 1로 설정
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Header />
      <div className="pt-[65px] text-center min-h-screen bg-white">
        <div className="mx-auto max-w-[390px] px-3 mt-[15px] flex flex-col">
          <div
            role="tablist"
            className="tabs tabs-boxed max-w-[370px] bg-white"
          >
            <a
              role="tab"
              className={`tab h-[43px] text-[15px] text-gray-600 font-CookieRunRegular border-solid border-2 border-btnClickColor ${
                activeTab === 1 ? "bg-btnClickColor" : "bg-white"
              }`}
              onClick={() => setActiveTab(1)}
            >
              기부 랭킹
            </a>
            <a
              role="tab"
              className={`tab h-[43px] text-[15px] text-gray-600 font-CookieRunRegular border-solid border-2 border-btnClickColor ${
                activeTab === 2 ? "bg-btnClickColor" : "bg-white"
              }`}
              onClick={() => setActiveTab(2)}
            >
              사용자 랭킹
            </a>
          </div>
          <div className="mx-auto max-w-[370px] p-2" style={{height : "calc(100dvh - 140px)"}}>
            <div role="tabpanel" className="tab-content block w-[350px]">
              {activeTab === 1 && <MoneyRanking />}
              {activeTab === 2 && <UserRanking />}
            </div>
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}
// function RankingPage() {
//   return (
//     <>
//       <Header />
//       <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
//         <div className="w-80 h-80">
//           <Lottie animationData={ContructionAnimation} loop={true} />
//         </div>
//         <div className="mx-auto max-w-[390px] font-bold">
//           아직 제공되지 않는 서비스입니다.
//         </div>
//       </div>
//       <ButtomNavigation />
//     </>
//   );
// }
export default RankingPage;
