import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await fetch(`https://heartfolio/oauth?code=${code}`);
        
        if (response.ok) {
          const token = response.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
            window.location.href = "/";
          } else {
            console.error("Authorization token is missing from the response headers.");
          }
        } else {
          console.error("Failed to login:", response.statusText);
        }
      } catch (error) {
        console.error("Error during Kakao login:", error);
      }
    };

    kakaoLogin();
  }, [navigate, code]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
};

export default KakaoRedirect;
