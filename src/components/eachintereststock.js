import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 관심종목의 각 주식
export default function Eachintereststock(props) {
    const navigate = useNavigate();

    // useState를 사용하여 이미지의 경로를 관리하는 상태를 선언합니다.초기값으로 'a.jpg'를 설정합니다.
    const [imageSrc, setImageSrc] = useState('/assets/images/interest.png');

    // 이미지 경로를 변경하는 함수를 정의.
    const toggleImage = (id) => {
        // setImageSrc를 사용하여 이미지 경로를 업데이트합니다.
        // 조건부 연산자를 사용하여 이미지 바꾸는 로직을 구현.
        setImageSrc( imageSrc=== '/assets/images/uninterest.png' ? '/assets/images/interest.png' : '/assets/images/uninterest.png');

        //좋아요 되어있는거 클릭해서 없애기
        // fetch("https://heartfolio.site/api/stock/favorites/" + stock_id, {
        //     credentials: "include",
        //     method: "DELETE",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }).then((response) => {
            
        //   });
    };

    // 각 주식 페이지 이동
    function handleClick(get_id) {
        navigate(`/stock/${get_id}`);
    }

    return (
        <div className='flex flex-rowmx-auto max-w-[390px] m-3 bg-white hover:bg-gray-50' >

            {/* 하트 */}
            {/* 이 버튼은 클릭 시 toggleImage 함수를 호출하여 이미지가 바뀝니다. */}
            <button onClick={()=> toggleImage(props.stockId)} className='px-3'>
                {/* 이미지 태그를 사용하여 현재 상태에 저장된 imageSrc 경로의 이미지를 표시합니다. */}
                <img className='w-6 ' src={imageSrc} alt="Heart Icon" />
            </button>
            {/* 내용 */}
            <div className='ml-4 w-[300px]'onClick={()=> handleClick(props.stockId)} >
                {/* 종목이름 */}
                <h1 className=''>
                    {props.stockName}
                </h1>
                {/* 종목정보 */}
                <div className='flex flex-row' >
                    {/* 현재가 */}
                    <p className='mr-1'>{props.currentPrice.toLocaleString()}</p>

                    {/* 전일대비수익 */}
                    <div className={`mr-1 ${
                    props.earningValue > 0
                      ? "text-redColor"
                      : props.earningValue<0
                      ? "text-blueColor"
                      : "text-[#000000]"
                    }`}>{props.earningValue}</div>

                    {/* 수익률 */}
                    <div className={`mr-1 ${
                    props.earningRate> 0
                      ? "text-redColor"
                      : props.earningRate <0
                      ? "text-blueColor"
                      : "text-[#000000]"
                    }`}>({props.earningRate}%)
                    </div>        
                </div>
            </div>
        </div>
    );
}
  