import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function StockHeader(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [src, setSrc] = useState("/assets/images/uninterest.png"); // 기본값을 초기화
  const [isProcessing, setIsProcessing] = useState(false); // 클릭 상태 관리
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.data) {
      setLoading(false);  // 데이터가 로드되면 로딩 상태 해제
    }
  }, [props.data]);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
    if (props.data?.likePresent === false) {
      setSrc("/assets/images/uninterest.png");
    } else if (props.data?.likePresent === true) {
      setSrc("/assets/images/interest.png");
    }
  }, [token, props.data?.likePresent]);

  async function handlefavorite() {
    // 클릭 중이면 더 이상 실행되지 않도록 함
    if (isProcessing) {
      return;
    }
    // 클릭이 처리 중임을 표시
    setIsProcessing(true);

    // 로그인 안 했을 시
    if (!isAuthenticated) {
      toast.error("로그인이 필요한 서비스입니다.", { autoClose: 2000 });

      setTimeout(() => {
        window.location.assign("/login");
      }, 2000);
      setIsProcessing(false);
      return;
    }

    // 로그인 했을 때
    try {
      let response;
      if (src === "/assets/images/uninterest.png") {
        // 좋아요 안 눌려있을 때 관심종목으로 등록
        response = await fetch(
          `${process.env.REACT_APP_API_URI}/stock/favorites/` + id,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              "Content-Type": "application/json",
            },
          }
        );
        // 요청이 성공적인 경우 처리
        if (response.ok) {
          setSrc("/assets/images/interest.png");
          console.log("Successfully added to favorites");
          window.location.reload();
          setIsProcessing(false);
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
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken); // 새 access token 저장
            // 새로운 access token으로 원래 요청 다시 시도
            response = await fetch(
              `${process.env.REACT_APP_API_URI}/stock/favorites/` + id,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              setSrc("/assets/images/interest.png");
              console.log("Successfully added to favorites");
              window.location.reload();
            }
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            setIsProcessing(false);
            return;
          }
        }
      } else if (src == "/assets/images/interest.png") {
        // 좋아요 눌려있을 때 관심종목에서 제거
        response = await fetch(
          `${process.env.REACT_APP_API_URI}/stock/favorites/` + id,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          setSrc("/assets/images/uninterest.png");
          console.log("Successfully removed from favorites");
          window.location.reload();
          setIsProcessing(false);
          return;
        }

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
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken); // 새 access token 저장
            // 새로운 access token으로 원래 요청 다시 시도
            response = await fetch(
              `${process.env.REACT_APP_API_URI}/stock/favorites/` + id,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              setSrc("/assets/images/uninterest.png");
              console.log("Successfully removed from favorites");
              window.location.reload();
            }
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            setIsProcessing(false);
            return;
          }
        }
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsProcessing(false);
    }
  }

  // 이름 길이에 따른 폰트 크기 설정
  const combinedNameLength =
    `${props.data?.koreanName} (${props.data?.englishName})`.length;

  return (
    <>
      <div>
        <div className="mx-auto max-w-[390px] h-[50px] px-3 items-center flex justify-between">
          <img
            src="/assets/images/back.png"
            className="h-[20px] cursor-pointer"
            onClick={() => navigate(-1)}
          ></img>
          <div
            className="text-gray-600 text-center"
            onClick={() => {
              window.location.reload();
            }}
          >
            {loading ? (
              <div></div>
            ) : combinedNameLength > 30 ? (
              <>
                <div className="font-TheJamsil5Bold">
                  {props.data?.koreanName}
                </div>
                <div className="text-sm">({props.data?.englishName})</div>
              </>
            ) : (
              // 이름이 30자를 넘지 않는 경우
              <div className="font-TheJamsil5Bold">
                {props.data?.koreanName} ({props.data?.englishName})
              </div>
            )}
          </div>
          <img
            src={src}
            className="h-[20px] hover:cursor-pointer"
            onClick={() => handlefavorite()}
            alt="FavoriteHeart"
            // 클릭 중이면 비활성화
            style={{ pointerEvents: isProcessing ? "none" : "auto" }}
          ></img>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
}

export default StockHeader;
