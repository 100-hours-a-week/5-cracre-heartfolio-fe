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

  function handlefavorite() {
    // 클릭 중이면 더 이상 실행되지 않도록 함
    if (isProcessing) {
      return;
    }
    // 클릭이 처리 중임을 표시
    setIsProcessing(true);
    if (isAuthenticated == false) {
      toast.error("로그인이 필요한 서비스입니다.", { autoClose: 2000 });

      setTimeout(function () {
        window.location.assign("/login");
      }, 2000);
    }else if (src === "/assets/images/uninterest.png") {
      fetch("https://heartfolio.site/api/stock/favorites/" + id, {
        // credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setSrc("/assets/images/interest.png");
            console.log("success post like");
            window.location.reload();
          }
          // 클릭 처리 완료 후 상태를 false로 변경
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    } else if (src == "/assets/images/interest.png") {
      fetch("https://heartfolio.site/api/stock/favorites/" + id, {
        // credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setSrc("/assets/images/uninterest.png");
            console.log("success delete like");
            window.location.reload();
          } // 클릭 처리 완료 후 상태를 false로 변경
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
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
            {/* 이름이 30자를 넘는 경우 */}
            {combinedNameLength > 30 ? (
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
