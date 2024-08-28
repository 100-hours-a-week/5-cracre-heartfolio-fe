import Lottie from "lottie-react";
import ButtomNavigation from "../components/bottomNavigation";
import Header from "../components/header";
import ContructionAnimation from "../assets/animations/construction.json";

function CashChargePage() {
  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
        <div className="w-80 h-80">
          <Lottie animationData={ContructionAnimation} loop={true} />
        </div>
        <div className="mx-auto max-w-[390px] font-bold">
          아직 제공되지 않는 서비스입니다.
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default CashChargePage;
