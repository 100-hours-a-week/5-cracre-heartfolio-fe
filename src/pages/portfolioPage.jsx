import { useEffect, useState } from "react";
import Header from "../components/common/header";
import MoneyInfo from "../components/portfolio/moneyInfo";
import AssetConfiguration from "../components/portfolio/assetConfiguration";
import TransactionHistory from "../components/portfolio/transactionHistory";
import Holdings from "../components/portfolio/holdings";
import ButtomNavigation from "../components/common/bottomNavigation";
import Lottie from "lottie-react";
import alertAnimation from "../assets/animations/alert.json";

function Portfolio() {
  const [activeTab, setActiveTab] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white">
        {isAuthenticated === true ? (
          <>
            <MoneyInfo />
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
            <div className="mx-auto max-w-[370px] bg-backColor p-4 pb-[25px]">
              <div role="tabpanel" className="tab-content block">
                {activeTab === 1 && <AssetConfiguration />}
                {activeTab === 2 && <TransactionHistory />}
                {activeTab === 3 && <Holdings />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-80 h-80">
              <Lottie animationData={alertAnimation} loop={true} />
            </div>
            <div className="font-bold text-lg">
              로그인이 필요한 페이지입니다.
            </div>
          </div>
        )}
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Portfolio;
