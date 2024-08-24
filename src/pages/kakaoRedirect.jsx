import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetch(`https://heartfolio.site/oauth?code=${code}`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched data:", data);
          if (data && data.token && data.token.access_token) {
            localStorage.setItem('access_token', data.token.access_token);
            // localStorage.setItem('refresh_token', data.token.refresh_token);
            navigate('/');  // 로그인 후 메인 페이지로 리다이렉트
          } else {
            console.error("토큰없음", data);
          }
        })
        .catch(error => {
          console.error('로그인 실패', error);
          
        });
    } else {
      console.log("No code found in URL");
    }
  }, [code, navigate]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
};

export default KakaoRedirect;
