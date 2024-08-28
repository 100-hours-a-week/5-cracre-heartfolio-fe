import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ButtomNavigation() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      // 추가로 사용자 정보를 가져와서 상태로 저장 가능
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390px] bg-white shadow-lg">
      <div className="btm-nav flex justify-around h-[70px] items-center ">
                <button
          className="bg-btnNoClickColor p-0 text-sm text-gray-600"
          onClick={() => navigate("/")}
        >
          <a className="material-symbols-rounded">home</a>
          home
        </button>
        <button
          className="bg-btnNoClickColor p-0 text-sm  text-gray-600"
          onClick={() => navigate("/portfolio")}
        >
          <a className="material-symbols-rounded">description</a>
          내 포트폴리오
        </button>
        <button
          className="bg-btnNoClickColor p-0 text-sm  text-gray-600"
          onClick={() => navigate("/intereststock")}
        >
          <a className="material-symbols-outlined">monitoring</a>
          모의투자
        </button>
        <button
          className="bg-btnNoClickColor p-0 text-sm  text-gray-600"
          onClick={() => navigate("/mypage")}
        >
          <a className="material-symbols-outlined">person</a>
          마이페이지
        </button>
      </div>
    </div>
  );
}

export default ButtomNavigation;