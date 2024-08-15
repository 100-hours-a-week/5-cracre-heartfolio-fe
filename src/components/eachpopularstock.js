// 인기종목의 각 주식
export default function Eachpopularstock({ rank, name, price, change, percentage }) {
    return (
        <div className='flex flex-rowmx-auto max-w-[390px] '>
            {/* 순위 */}
            <p className=''>
                {rank}
            </p>
            {/* 내용 */}
            <div className='' >
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
  