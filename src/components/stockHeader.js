import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StockHeader(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialHeartImage =
    props.data?.likePresent === false
      ? "/assets/images/uninterest.png"
      : "/assets/images/interest.png";
  console.log("heart:", props.data?.likePresent);

  const [src, setSrc] = useState(initialHeartImage);
  useEffect(() => {
    const newHeartImage =
      props.data?.likePresent === false
        ? "/assets/images/uninterest.png"
        : "/assets/images/interest.png";
    setSrc(newHeartImage);
  }, [props.data?.likePresent]);
  
  function handlefavorite() {
    if (src === "/assets/images/uninterest.png") {
      fetch("https://heartfolio.site/api/stock/favorites/" + id, {
        // credentials: "include",
        method: "POST",
        headers: {
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
          <div onClick={() => navigate("/stock/" + id)}>
            {props.data?.symbol}
          </div>
          <img
            src={src}
            className="h-[20px]"
            onClick={() => handlefavorite()}
          ></img>
        </div>
      </div>
    </>
  );
}

export default StockHeader;
