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
    if(props.data?.likePresent === false){
      setSrc("/assets/images/uninterest.png");
    }else if(props.data?.likePresent === true){
      setSrc("/assets/images/interest.png");
    }
  }, [token, props.data?.likePresent]);

  console.log("heart:", props.data?.likePresent);

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
          navigate(`/stock/${id}`);
        }
      });
    }
  }
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
            className="text-gray-600"
            onClick={() => {
              window.location.reload();
            }}
          >
            {props.data?.koreanName} ({props.data?.englishName})
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
