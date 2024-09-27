import { useEffect, useState } from "react";
import Header from "../components/common/header";
import MoneyInfo from "../components/portfolio/moneyInfo";
import AssetConfiguration from "../components/portfolio/assetConfiguration";
import TransactionHistory from "../components/portfolio/transactionHistory";
import Holdings from "../components/portfolio/holdings";
import ButtomNavigation from "../components/common/bottomNavigation";
import Lottie from "lottie-react";
import alertAnimation from "../assets/animations/alert.json";
import { useLocation, useParams } from "react-router-dom";

function Portfolio() {
  const initialTab = parseInt(localStorage.getItem("activeTab")) || 1; // 로컬 스토리지에서 activeTab 불러오기
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab); // activeTab을 로컬 스토리지에 저장
  }, [activeTab]);

    // 페이지 떠날 때 activeTab을 1로 설정
    useEffect(() => {
      return () => {
        localStorage.setItem("activeTab", 1); // 언마운트 시 activeTab을 1로 설정
      };
    }, []);

  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white">
        {isAuthenticated === true ? (
          <>
            <MoneyInfo id={id}/>
            <div
              role="tablist"
              className="tabs tabs-bordered mx-auto max-w-[370px] bg-backColor mt-[34px]"
            >
              <a
                role="tab"
                className={`tab h-[50px] ${
                  activeTab === 1 ? "tab-active" : ""
                }  text-gray-600 font-semibold`}
                onClick={() => setActiveTab(1)}
              >
                자산 구성
              </a>
              <a
                role="tab"
                className={`tab h-[50px] ${
                  activeTab === 2 ? "tab-active" : ""
                }  text-gray-600 font-semibold`}
                onClick={() => setActiveTab(2)}
              >
                거래 내역
              </a>
              <a
                role="tab"
                className={`tab h-[50px] ${
                  activeTab === 3 ? "tab-active" : ""
                } text-gray-600 font-semibold`}
                onClick={() => setActiveTab(3)}
              >
                보유 종목
              </a>
            </div>
            <div className="mx-auto max-w-[370px] bg-backColor p-4 pb-[40px]">
              <div role="tabpanel" className="tab-content block">
                {activeTab === 1 && <AssetConfiguration id={id}/>}
                {activeTab === 2 && <TransactionHistory id={id}/>}
                {activeTab === 3 && <Holdings id={id}/>}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-80 h-80">
              <Lottie animationData={alertAnimation} loop={true} />
            </div>
            <div className="font-bold text-lg text-gray-400">
              로그인 후 포트폴리오를 확인해보세요
            </div>
            <a href="/login" className="pt-5 text-gray-400 hover:text-gray-600">
              로그인 하러가기
            </a>
          </div>
        )}
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Portfolio;
