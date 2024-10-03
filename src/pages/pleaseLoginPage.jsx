import Lottie from "lottie-react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import alertAnimation from "../assets/animations/alert.json";

function PleaseLogin() {
  return (
    <>
      <Header />
      <div className="pt-[100px] min-h-screen bg-white text-center flex flex-col items-center">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-80 h-80">
            <Lottie animationData={alertAnimation} loop={true} />
          </div>
          <div className="font-bold text-lg text-gray-500">
            로그인 후 이용 가능한 서비스입니다
          </div>
          <a href="/login" className="pt-5 text-gray-400 hover:text-gray-600">
            로그인 하러가기
          </a>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default PleaseLogin;
