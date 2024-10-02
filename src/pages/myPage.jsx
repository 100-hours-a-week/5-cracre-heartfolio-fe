import Lottie from "lottie-react";
import alertAnimation from "../assets/animations/alert.json";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import { useEffect, useState } from "react";
import InputBox from "../components/myInfo/inputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../hooks/useFetch";
import { Loading } from "../components/common/loading";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [helperText, setHelperText] = useState("*helper text");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [canFetch, setCanFetch] = useState(false); // 데이터 fetch 여부 관리
  const token = localStorage.getItem("access_token");

  // token 값에 따라 로그인 상태 설정
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      setCanFetch(true); // 로그인 상태일 때만 fetch 가능
    } else {
      setIsAuthenticated(false);
      setCanFetch(false); // 로그인되지 않았으면 fetch 중단
    }
  }, [token]);

  // 로그인 상태일 때만 API 요청
  const { data, error, loading } = useFetch(
    canFetch ? `${process.env.REACT_APP_API_URI}/user/info` : null
  );
  console.log("isAuthenticated:",isAuthenticated,"data:",data,"nickname",nickname)
  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
    }
  }, [data]); // data가 업데이트되면 nickname 상태도 업데이트

  const handleNickname = async () => {
    // 중복 불가 추가 필요!!
    if (nickname === "") {
      setHelperText("닉네임을 입력해주세요.");
    } else if (nickname.length > 7) {
      setHelperText("닉네임은 최대 7글자로 입력해주세요.");
    } else if (/[^가-힣a-zA-Z0-9]/.test(nickname)) {
      // 한글, 영어, 숫자를 제외한 특수문자, 공백, 띄어쓰기 등을 입력 시
      setHelperText("특수문자, 공백, 띄어쓰기 등의 입력이 불가능합니다.");
    } else {
      setHelperText("");
      // 닉네임 수정하는 로직
      let response = await fetch(
        `${process.env.REACT_APP_API_URI}/user/fixNickname`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: nickname,
          }),
        }
      );
      // 요청이 성공적인 경우 처리
      if (response.ok) {
        toast.success("수정완료", { autoClose: 2000 });

        setTimeout(function () {
          window.location.assign("/mypage");
        }, 2000);
        return;
      } else if (response.status === 409) {
        setHelperText("중복된 닉네임입니다.");
        return;
      }
      // 토큰 만료인 경우 처리
      if (response.status === 401) {
        // Access token 만료 -> refresh token으로 새 access token 요청
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
          const data = refreshResponse.json();
          localStorage.setItem("access_token", data.accessToken); // 새 access token 저장
          // 새로운 access token으로 원래 요청 다시 시도
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/user/fixNickname`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nickname: nickname,
              }),
            }
          );
          if (response.ok) {
            toast.success("수정완료", { autoClose: 2000 });
            setTimeout(function () {
              window.location.assign("/mypage");
            }, 2000);
          } else if (response.status === 409) {
            setHelperText("중복된 닉네임입니다.");
            return;
          }
        } else {
          // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          return;
        }
      }
    }
  };

  return (
    <>
      <Header />
      <div className="pt-[100px] min-h-screen bg-white text-center flex flex-col items-center">
        {isAuthenticated === true ? (
          loading ? (
            <Loading />
          ) : (
            <div className="mx-auto max-w-[390px] w-[380px] pb-[65px]">
              <div>
                <div className="avatar">
                  <div className="mask mask-circle h-32 w-32 bg-gray-400">
                    <img src={data?.profile_image_url} alt="profile image" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mt-8">
                <InputBox text="이름" data={data?.name} width="w-[320px]" />
                <div className="flex flex-col w-[320px] mb-2">
                  <div className="flex justify-between">
                    <div className="text-gray-600 text-lg">닉네임</div>
                    <input
                      className="text-gray-500 h-8"
                      placeholder="닉네임"
                      value={nickname || ""}
                      onChange={(e) => setNickname(e.target.value)}
                    ></input>
                  </div>
                  <h3 className="text-red-500 text-right text-[12px] pt-1">
                    {helperText}
                  </h3>
                </div>
                <div className="flex w-[320px] justify-between">
                  <InputBox
                    text="내 캐시"
                    data={data?.cash ? data.cash.toLocaleString() : "0"}
                    width="w-[245px]"
                  />
                  <div className="text-right">
                    <button
                      className="h-[25px] border-solid border-[1px] border-gray-200 w-[65px] text-sm rounded-lg"
                      onClick={() => navigate("/cashCharge")}
                    >
                      캐시 충전
                    </button>
                  </div>
                </div>
                <InputBox
                  text="기부한 금액"
                  data={data?.donation ? data.donation.toLocaleString() : "0"}
                  width="w-[320px]"
                />
              </div>
              <div className="pt-10 w-[350px] text-right">
                <button
                  className="bg-btnClickColor w-10 text-gray-600"
                  onClick={handleNickname}
                >
                  수정
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-80 h-80">
              <Lottie animationData={alertAnimation} loop={true} />
            </div>
            <div className="font-bold text-lg text-gray-500">
              로그인 후 이용 가능한 서비스입니다
            </div>
            <a href="/login" className="pt-5 text-gray-400 hover:text-gray-600">
              로그인 하러가기
            </a>
          </div>
        )}
      </div>
      <ButtomNavigation />
      <ToastContainer position="top-center" />
    </>
  );
}

export default MyPage;
