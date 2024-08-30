import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StockHeader(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [src, setSrc] = useState("/assets/images/uninterest.png"); // 기본값을 초기화

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
    if (src === "/assets/images/uninterest.png") {
      fetch("https://heartfolio.site/api/stock/favorites/" + id, {
        // credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setSrc("/assets/images/interest.png");
          console.log("success post like")
          navigate(`/stock/${id}`);
        }
      });
    } else if (src == "/assets/images/interest.png") {
      fetch("https://heartfolio.site/api/stock/favorites/" + id, {
        // credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setSrc("/assets/images/uninterest.png");
          console.log("success delete like")
          navigate(`/stock/${id}`);
        }
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
            className="h-[20px]"
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
                <div className="font-TheJamsil5Bold">{props.data?.koreanName}</div>
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
            className={`h-[20px] ${isAuthenticated ? "visible" : "invisible"}`}
            onClick={() => handlefavorite()}
            alt="FavoriteHeart"
          ></img>
        </div>
      </div>
    </>
  );
}

export default StockHeader;
