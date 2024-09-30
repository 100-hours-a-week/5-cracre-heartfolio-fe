import React, { useEffect, useState } from "react"; // Import useState
import Lottie from "lottie-react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import ContructionAnimation from "../assets/animations/construction.json";
import CategoryModal from "../components/cashCharge/categoryModal";
import CheckModal from "../components/cashCharge/checkModal";
import alertAnimation from "../assets/animations/alert.json";
import { fetchWithToken } from "../utils/api";
import { Loading } from "../components/common/loading";

function CashChargePage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderUid, setOrderUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setIsAuthenticated(true);
    }

    const { IMP } = window;
    if (IMP && process.env.REACT_APP_IMP_CODE) {
      IMP.init(`${process.env.REACT_APP_IMP_CODE}`);
    }
    setLoading(false);
  }, []);

  const showModal = async (amount) => {
    setSelectedAmount(amount);
    setIsCategoryModalOpen(true); // 모달을 열기 위해 상태 업데이트
    // fetchWithToken 함수 사용 (POST 요청)
    const response = await fetchWithToken(
      `${process.env.REACT_APP_API_URI}/donation/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: amount,
        }),
      }
    );
    // 응답에서 orderUid를 추출
    if (response && response.orderUid) {
      setOrderUid(response.orderUid);
    } else {
      console.error("orderUid가 응답에 포함되지 않았습니다.");
    }
  };

  const handleonSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(false); // 기부 영역 선택 후 모달 닫기
    setIsCheckModalOpen(true); // 확인 모달 열기
  };

  const handleCheckModalClose = () => {
    setIsCheckModalOpen(false); // 확인 모달 닫기
  };

  const handleCharge = async (amount) => {
    setIsCheckModalOpen(false); // 확인 모달 닫기

    let response = await fetch(
      `${process.env.REACT_APP_API_URI}/donation/payment/${orderUid}`
    );
    let data = await response.json();

    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMP_CODE);
    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: data?.order_uid, // 주문 번호
        name: "Heartfolio 캐시 충전",
        amount: data?.payment_price, // 상품 가격
        buyer_name: data?.buyer_name,
        buyer_tel: "010-0000-0000",
      },
      function (rsp) {
        if (rsp.success) {
          fetch(`${process.env.REACT_APP_API_URI}/donation/payment/success`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_uid: rsp.imp_uid,
              order_uid: rsp.merchant_uid,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              window.location.href = "/success-payment";
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("결제 정보 전달 실패");
            });
        } else {
          window.location.href = "/fail-payment";
        }
      }
    );
  };

  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
        {loading ? (
          <Loading />
        ) : isAuthenticated == true ? (
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
          clickYes={() => handleCharge(selectedAmount)}
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
