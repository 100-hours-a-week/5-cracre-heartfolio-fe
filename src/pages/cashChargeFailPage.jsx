import Lottie from "lottie-react";
import ContructionAnimation from "../assets/animations/construction.json";
import PayFailAnimation from "../assets/animations/payFail.json";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";

function CashChargeFailPage() {
  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
        <div className="flex flex-col items-center pt-5">
          <div className="w-80 h-80">
            <Lottie animationData={PayFailAnimation} loop={false} />
          </div>
          <div className="mx-auto max-w-[390px] font-bold">
            결제를 실패하였습니다
          </div>
          <a href="/cashcharge" className="text-sm mt-2 text-gray-500">캐시충전으로 다시 가기</a>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

// function CashChargeFailPage() {
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

export default CashChargeFailPage;
