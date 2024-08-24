import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (code) {
        try {
          const response = await fetch(`https://heartfolio.site/oauth?code=${code}`);
          const data = await response.json();

          if (data && data.token && data.token.access_token) {
            localStorage.setItem('access_token', data.token.access_token);
            // localStorage.setItem('refresh_token', data.token.refresh_token);

            // 토큰 저장 후 메인 페이지로 리다이렉트
            navigate('/');
          } else {
            console.error("토큰 없음", data);
          }
        } catch (error) {
          console.error('로그인 실패', error);
        }
      } else {
        console.log("URL에 코드가 없습니다.");
      }
    };

    fetchAccessToken();
  }, [code, navigate]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
};

export default KakaoRedirect;
