import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { fetchWithToken } from "../../utils/api";

// 관심종목의 각 주식
export default function Eachintereststock(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  // useState를 사용하여 이미지의 경로를 관리하는 상태를 선언합니다.초기값으로 'a.jpg'를 설정합니다.
  const [imageSrc, setImageSrc] = useState("/assets/images/interest.png");
  // 이미지 경로를 변경하는 함수를 정의.
  const toggleImage = async (stock_id) => {
    try {
      // 좋아요 되어있는거 클릭해서 없애기
      const response = await fetchWithToken(
        `${process.env.REACT_APP_API_URI}/stock/favorites/` + stock_id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      if (response && response.ok) {
        navigate("/intereststock");
      }
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("error:", error);
    }
  };

  // 각 주식 페이지 이동
  function handleClick(get_id) {
    navigate(`/stock/${get_id}`);
  }
  return (
    <div className="flex mx-auto max-w-[350px] m-3 mb-2 bg-white flex-col">
      <div className="flex hover:bg-gray-50">
        {/* 하트 */}
        {/* 이 버튼은 클릭 시 toggleImage 함수를 호출하여 이미지가 바뀝니다. */}
        <button onClick={() => toggleImage(props.stockId)} className="px-3">
          {/* 이미지 태그를 사용하여 현재 상태에 저장된 imageSrc 경로의 이미지를 표시합니다. */}
          <img className="w-6 " src={imageSrc} alt="Heart Icon" />
        </button>

        {/* 내용 */}
        <div
          className="text-gray-600 ml-4 w-[300px]"
          onClick={() => handleClick(props.stockId)}
        >
          {/* 종목이름 */}
          <h1 className="text-gray-600 text-[15px] font-bold">
            {props.stockKorea} ({props.stockName})
          </h1>
          {/* 종목정보 */}
          <div className="flex flex-row mt-1">
            {/* 현재가 */}
            <p className="mr-1 text-gray-600">
              {props.currentPrice.toLocaleString()}KRW
            </p>

            {/* 전일대비수익 */}
            <div
              className={`mr-1 ${
                props.earningValue > 0
                  ? "text-redColor"
                  : props.earningValue < 0
                  ? "text-blueColor"
                  : "text-gray-600"
              }`}
            >
              {props.earningValue > 0
                ? `+${props.earningValue.toLocaleString()}`
                : `${props.earningValue.toLocaleString()}`}
            </div>

            {/* 수익률 */}
            <div
              className={`mr-1 ${
                props.earningRate > 0
                  ? "text-redColor"
                  : props.earningRate < 0
                  ? "text-blueColor"
                  : "text-gray-600"
              }`}
            >
              ({props.earningRate.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
      <div className="border-gray-300 border-[1px] mt-2" />
    </div>
  );
}
