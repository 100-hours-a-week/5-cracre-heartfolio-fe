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
  const [orderUid, setOrderUid] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  

  useEffect(() => {
    // const token = localStorage.getItem("access_token");
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjc2NTcwMjEyIiwiZXhwIjoxNzI2NDk0NDczfQ.-mLMO2iwrt8P3NzelhTE3gv-XjCqtiZeCVuLQ0XTTD0l-C9dAsX3zseruF2_wRDvM3_9N56L2IvlCPfaz7erfg";
    if (token) {
      setIsAuthenticated(true);
    }

    const { IMP } = window;
    IMP.init(`${process.env.REACT_APP_IMP_CODE}`);
  }, []);

  const showModal = (amount) => {
    setSelectedAmount(amount);
    setOrderUid(`order_${new Date().getTime()}`); // 주문 번호 생성
    setBuyerName('홍길동'); // 로그인된 사용자 이름 설정
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

  const handleCharge = (amount)=>{
    setIsCheckModalOpen(false); // 확인 모달 닫기
    const {IMP} = window;
    IMP.init(process.env.REACT_APP_IMP_CODE);
    IMP.request_pay({
      pg:'html5_inicis.INIpayTest',
      pay_method : 'card',
      merchant_uid: orderUid, // 주문 번호
      name: '캐시충전',
      amount : amount, // 상품 가격
      buyer_email : 'test1@example.com',
      buyer_name : buyerName, // 구매자 이름
    },function(rsp){
      if (rsp.success) {
        fetch('https://heartfolio.site/api/payment/success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_uid: rsp.imp_uid,
            order_uid: rsp.merchant_uid,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          window.location.href = "/success-payment";
        })
        .catch(error => {
          console.error('Error:', error);
          alert('결제 정보 전달 실패');
        });
      } else {
        window.location.href = "/fail-payment";
        alert('결제 실패');
      }
      
    })
  }

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
          clickYes={()=>handleCharge(selectedAmount)}
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
