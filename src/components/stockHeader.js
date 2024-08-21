import { useNavigate, useParams } from "react-router-dom";

function StockHeader(props) {
  const { id } = useParams();
  const navigate = useNavigate();
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
          <img src="/assets/images/uninterest.png" className="h-[20px]"></img>
        </div>
      </div>
    </>
  );
}

export default StockHeader;
