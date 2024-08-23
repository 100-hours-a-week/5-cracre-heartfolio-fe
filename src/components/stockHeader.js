import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StockHeader(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [src, setSrc] = useState("/assets/images/uninterest.png");

  function handleFavorite(){
    if(src=="/assets/images/uninterest.png"){
      fetch("http://localhost:8080/api/stock/favorites/"+id, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
      }).then((res) => {
        if (res.ok) {
        setSrc("/assets/images/interest.png")
        }
      });
    }else if(src=="/assets/images/interest.png"){
      fetch("http://localhost:8080/api/stock/favorites/"+id, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
      }).then((res) => {
        if (res.ok) {

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
            onClick={() => navigate("/intereststock")}
          ></img>
          <div onClick={() => navigate("/stock/"+id)}>{props.name}</div>
          <img src="/assets/images/uninterest.png" className="h-[20px]"  onClick={handleFavorite} ></img>
        </div>
      </div>
    </>
  );
}

export default StockHeader;
