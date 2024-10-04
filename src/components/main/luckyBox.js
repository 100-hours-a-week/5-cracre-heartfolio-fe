import { fetchWithToken } from "../../utils/api";
import MyLuck from "./myLuck";
import { useEffect, useState } from "react";

function LuckyBox() {
  const [showLuck, setShowLuck] = useState(false);
  const [luckData, setLuckData] = useState(null);
  const [ok, setOk] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  async function seeLuck() {
    if (isAuthenticated) {
      try {
        let res = await fetchWithToken(
          `${process.env.REACT_APP_API_URI}/fortune`,
          {
            method: "POST",
          }
        );
        if (res) {
          setShowLuck(true);
          setLuckData(res);
          setOk(true);
        } else {
          setShowLuck(true);
          setLuckData("운세를 가져올 수 없습니다. 다시 시도해주세요");
          setOk(false);
        }
      } catch (error) {
        setShowLuck(true);
        setLuckData("운세를 가져올 수 없습니다. 다시 시도해주세요");
        setOk(false);
      }
    } else {
      setShowLuck(true);
      setLuckData("로그인이 필요한 서비스입니다.");
      setOk(false);
    }
  }

  return (
    <div>
      {showLuck && luckData ? (
        <MyLuck data={luckData} ok={ok} />
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
