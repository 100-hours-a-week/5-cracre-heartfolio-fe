import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) {
      fetch(`https://heartfolio.site/oauth?code=${code}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("서버 응답이 올바르지 않습니다.");
          }
          console.log(response.data)
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data:", data);
          if (data && data.token && data.token.access_token) {
            localStorage.setItem("access_token", data.token.access_token);
            // localStorage.setItem('refresh_token', data.token.refresh_token);
            navigate("/"); // 로그인 후 메인 페이지로 리다이렉트
          } else {
            console.error("토큰이 없습니다.", data);
          }
        })
        .catch((error) => {
          console.error("로그인 실패", error);
        });
    } else {
      console.log("URL에서 코드를 찾을 수 없습니다.");
    }
  }, [code, navigate]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
};

export default KakaoRedirect;
