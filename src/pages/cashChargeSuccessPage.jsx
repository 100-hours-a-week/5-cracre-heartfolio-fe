import Lottie from "lottie-react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import ContructionAnimation from "../assets/animations/construction.json";

function CashChargeSuccessPage() {
  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
        <div className="flex flex-col items-center pt-5">
          <img
            src="/assets/images/heart-rate.png"
            alt="heart"
            className="w-40 h-40"
          ></img>
          <div className="text-gray-600 mt-10">
            여러분의 따뜻한 마음이 잘 전달되었습니다
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

// function CashChargeAfterPage() {
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

export default CashChargeSuccessPage;
