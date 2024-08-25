import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_REST_API_KEY);
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/oauth`,
    });
    console.log(window.location.origin)
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center mx-auto max-w-[390px] px-3 my-[100px]">
          <img
            src="/assets/images/heartfolioLogo.webp"
            alt="heartfolio logo"
            className="w-[180px] my-10 rounded-lg"
          />

          <p className="text-3xl m-5 font-semibold">HeartFoilo</p>
          <p className="m-2 font-medium ">
            기부로 마음을 공유할 수 있는 모의투자
          </p>
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
      <a href="/">
        <p className="text-xs m-5 text-center text-slate-400	">
          비회원으로 이용하기
        </p>
      </a>
    </>
  );
};

export default LoginPage;
