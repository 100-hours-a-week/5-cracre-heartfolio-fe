import Lottie from "lottie-react";
import alertAnimation from "../assets/animations/alert.json";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import ContructionAnimation from "../assets/animations/construction.json";
import { useEffect, useState } from "react";
import InputBox from "../components/myInfo/inputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../hooks/useFetch";

function MyPage() {
  // const data = {
  //   name: "하트폴리오",
  //   email: "cracre@example.com",
  //   nickname: "레로스앨웬",
  //   profile: "/profile/photo",
  //   cash: 1500000,
  //   donate: 5000,
  // };
  localStorage.setItem(
    "access_token",
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjc2NTcwMjEyIiwiZXhwIjoxNzI2OTk3MjQ4fQ.zTWUH6ZcqCQX7TqrJofxprov3oQB0Z4ZR1U8ULM096n1fqyYgNEDlrwp6IBJabc7x1HjzZTfEUyrccTNs4SSiA"
  );
  const { data, error, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/user/info`
  );
  const [nickname, setNickname] = useState(data?.nickname);
  const [helperText, setHelperText] = useState("*helper text");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
    }
  }, [data]); // data가 업데이트되면 nickname 상태도 업데이트

  const handleNickname = () => {
    // 중복 불가 추가 필요!!
    if (nickname == "") {
      setHelperText("닉네임을 입력해주세요.");
    } else if (nickname.length > 7) {
      setHelperText("닉네임은 최대 7글자로 입력해주세요.");
    } else if (/[^가-힣a-zA-Z0-9]/.test(nickname)) {
      // 한글, 영어, 숫자를 제외한 특수문자, 공백, 띄어쓰기 등을 입력 시
      setHelperText("특수문자, 공백, 띄어쓰기 등의 입력이 불가능합니다.");
    } else {
      setHelperText("");
      // 닉네임 수정하는 로직
      toast.success("수정완료", { autoClose: 2000 });

      setTimeout(function () {
        window.location.assign("/mypage");
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-[100px] min-h-screen bg-white text-center flex flex-col items-center">
        {isAuthenticated === true ? (
          loading ? (
            <div className="mx-auto max-w-[350px] py-4 pb-8 min-h-screen bg-white">
              <div className="text-center text-gray-500">로딩 중...</div>
            </div>
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
                <InputBox text="이름" data={data?.name} />
                {/* <InputBox text="이메일" data={data?.email} /> */}
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
                <InputBox
                  text="내 캐시"
                  data={data?.cash ? data.cash.toLocaleString() : "0"}
                />
                <InputBox
                  text="기부한 금액"
                  data={data?.donation ? data.donation.toLocaleString() : "0"}
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
            <div className="font-bold text-lg text-gray-400">
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

// function MyPage() {
//   return (
//     <>
//       <Header />
//       <div className="pt-[90px] min-h-screen bg-white text-center flex flex-col items-center">
//         <div className="w-80 h-80">
//           <Lottie animationData={ContructionAnimation} loop={true} />
//         </div>
//         <div className="mx-auto max-w-[390px] font-bold">
//           아직 제공되지 않는 서비스입니다.
//         </div>
//       </div>
//       <ButtomNavigation />
//     </>
//   );
// }

export default MyPage;
