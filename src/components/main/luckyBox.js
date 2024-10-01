import { fetchWithToken } from "../../utils/api";
import MyLuck from "./myLuck";
import { useState } from "react";

function LuckyBox() {
  const [showLuck, setShowLuck] = useState(false);
  const [luckData, setLuckData] = useState(null);
  const [fortuneMessage, setFortuneMessage] = useState(null);
  const token = localStorage.getItem("access_token");

  const isUnauthorized = !token;

  async function seeLuck() {
    setShowLuck(true);
    if (!isUnauthorized) {
      try {
        const res = await fetchWithToken(
          `${process.env.REACT_APP_API_URI}/fortune`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        fortuneMessage = res?.message;
        setLuckData(fortuneMessage); // 객체의 message 값만 설정
        if (res.status === 401) {
          const refreshToken = localStorage.getItem("refresh_token");
          const refreshResponse = await fetch(
            `${process.env.REACT_APP_API_URI}/auth/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken);

            // 새로운 access token으로 요청 다시 시도
            res = await fetch(`${process.env.REACT_APP_API_URI}/fortune`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
            });

            if (res.ok) {
              fortuneMessage = res?.message;
              setLuckData(fortuneMessage);
            }
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return;
          }
        }
      } catch (error) {
        setLuckData("운세 데이터를 가져올 수 없습니다. 다시 시도해주세요");
      }
    } else {
      setLuckData("로그인이 필요한 서비스입니다.");
    }
  }

  return (
    <div>
      {showLuck || luckData ? (
        <MyLuck data={luckData} />
      ) : (
        <div
          className="flex justify-center pt-[25px] mt-2 h-20 rounded-xl bg-gradient-to-r from-amber-200/50 to-pink-200/50"
          onClick={() => seeLuck()} // 클릭 시 MyLuck 보여주도록 상태 변경
        >
          <p className="text-lg ml-[10px] text-gray-600 font-TmoneyRoundWindExtraBold">
            오늘의 운세
          </p>
        </div>
      )}
    </div>
  );
}

export default LuckyBox;
