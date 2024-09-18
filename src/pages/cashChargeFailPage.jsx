import Lottie from "lottie-react";
import ContructionAnimation from "../assets/animations/construction.json";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";

// function CashChargeFailPage() {
//   return (
//     <>
//       <Header />
//       <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
//         <div className="flex flex-col items-center pt-5">
//           <div className="text-gray-600 mt-10">
//             결제를 실패하였습니다
//           </div>
//         </div>
//       </div>
//       <ButtomNavigation />
//     </>
//   );
// }

function CashChargeFailPage() {
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

export default CashChargeFailPage;
