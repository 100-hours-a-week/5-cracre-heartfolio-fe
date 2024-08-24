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
            navigate('/');  // 로그인 후 메인 페이지로 리다이렉트
          } else {
            console.error("Invalid token response:", data);
            navigate('/login');  // 로그인 실패 시 로그인 페이지로 리다이렉트
          }
        })
        .catch(error => {
          console.error('Error during authentication:', error);
          navigate('/login');  // 에러 발생 시 로그인 페이지로 리다이렉트
        });
    } else {
      console.log("No code found in URL");
      navigate('/login');  // 인가 코드가 없으면 로그인 페이지로 리다이렉트
    }
  }, [code, navigate]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
};

export default KakaoRedirect;
