import React, { useEffect } from "react";
import ButtomNavigation from "../components/bottomNavigation";

const LoginPage = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY; //REST API KEY
  const REDIRECT_URI = `http://localhost:3001/oauth`;  // oauth 요청 URL

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  https: return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center mx-auto max-w-[390px] px-3 my-[100px]">
          <img
            src="/assets/images/heartfolioLogo.webp"
            alt="heartfolio logo"
            className="w-[180px] my-10"
          ></img>
          <p>기부로 마음을 공유할 수 있는 모의투자, HeartFoilo</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button id="kakao-login-btn" onClick={handleLogin}>
          <img
            src="/assets/images/kakao_login_medium_narrow.png"
            alt="Kakao Login Button"
            className="w-full"
          />
        </button>
        <p id="token-result" className="mt-4 text-sm text-gray-700"></p>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default LoginPage;
