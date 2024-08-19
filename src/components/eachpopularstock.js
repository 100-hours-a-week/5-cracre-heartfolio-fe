import { useState } from 'react';
import { useNavigate } from "react-router-dom";


// 인기종목의 각 주식
export default function Eachpopularstock({ rank, name, price, change, percentage }) {

    //각 주식 페이지로 이동
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/stock=${name}`);
    };


    return (
        //onClick={handleClick} 아래줄에 넣어주세요!!
        <div className='flex flex-rowmx-auto max-w-[390px]   bg-white  hover:bg-gray-50'>
            {/* 순위 */}
            <p className='w-10 py-3 text-center'>
                {rank}
            </p>
            {/* 내용 */}
            <div className='ml-4 w-[300px]' >
                {/* 종목이름 */}
                <h1 className=''>
                    {name}
                </h1>
                {/* 종목정보 */}
                <div className='flex flex-row' >
                    {/* 현재가 */}
                    <p className=''>{price}</p>
                    {/* 전일대비수익 */}
                    <p className=''>{change}</p>
                    {/* 수익률 */}
                    <p className=''>{percentage}</p>
                </div>
            </div>
        </div>
    );
  }
  