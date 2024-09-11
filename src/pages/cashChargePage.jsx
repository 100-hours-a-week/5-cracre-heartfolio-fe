import React, { useEffect, useState } from "react"; // Import useState
import Lottie from "lottie-react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import ContructionAnimation from "../assets/animations/construction.json";
import CategoryModal from "../components/cashCharge/categoryModal";
import CheckModal from "../components/cashCharge/checkModal";
import alertAnimation from "../assets/animations/alert.json";

function CashChargePage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const showModal = (amount) => {
    setSelectedAmount(amount);
    setIsCategoryModalOpen(true); // 모달을 열기 위해 상태 업데이트
  };

  const handleonSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(false); // 기부 영역 선택 후 모달 닫기
    setIsCheckModalOpen(true); // 확인 모달 열기
  };

  const handleCheckModalClose = () => {
    setIsCheckModalOpen(false); // 확인 모달 닫기
  };

  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
        {isAuthenticated == true ? (
          <>
            <div className="text-xl text-gray-600 font-TmoneyRoundWindExtraBold">
              캐시충전 서비스
            </div>
            <button
              className="btn w-[300px] h-[90px] mt-11 bg-btnNoClickColor border-0 text-gray-600 justify-between hover:bg-btnClickColor"
              onClick={() => showModal(1000)}
            >
              <div className="text-">1000원</div>
              <div>1,200,000원 캐시</div>
            </button>
            <button
              className="btn w-[300px] h-[90px] mt-11 bg-btnNoClickColor border-0 text-gray-600 justify-between hover:bg-btnClickColor"
              onClick={() => showModal(2000)}
            >
              <div className="text-">2000원</div>
              <div>2,400,000원 캐시</div>
            </button>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-80 h-80">
              <Lottie animationData={alertAnimation} loop={true} />
            </div>
            <div className="font-bold text-lg text-gray-400">
              로그인 후 이용 가능한 서비스입니다
            </div>
            <a href="/login" className="pt-5 text-gray-400 hover:text-gray-600">
              로그인 하러가기
            </a>
          </div>
        )}
      </div>
      {/* 기부 영역 선택 모달창 */}
      {isCategoryModalOpen && (
        <CategoryModal
          amount={selectedAmount}
          onSelectCategory={handleonSelectCategory}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
      {/* 기부 확인 모달창 */}
      {isCheckModalOpen && (
        <CheckModal
          amount={selectedAmount}
          category={selectedCategory}
          onClose={handleCheckModalClose}
        />
      )}
      <ButtomNavigation />
    </>
  );
}

// function CashChargePage() {
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

export default CashChargePage;
