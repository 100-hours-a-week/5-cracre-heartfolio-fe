import Header from '../components/header';
import Stocktype from '../components/stocktype';
import Eachpopularstock from '../components/eachpopularstock';

function Popularstock() {
    // 인기 종목 데이터 배열
    const popularStocks = [
        { id: 1, rank: '1', name: 'NVIDIA', price: '23,000', change: '+1200', percentage: '(+8.8%)' },
        { id: 2, rank: '2', name: 'Apple', price: '150,000', change: '+3000', percentage: '(+2.0%)' },
        { id: 3, rank: '3', name: 'Tesla', price: '50,000', change: '-2000', percentage: '(-3.5%)' },
        // ... 더 많은 종목 추가
        { id: 24, rank: '25', name: 'Intel', price: '30,000', change: '+1000', percentage: '(+3.3%)' },
        { id: 25, rank: '26', name: 'AMD', price: '40,000', change: '+500', percentage: '(+1.3%)' }, // 26번째 종목 (표시되지 않음)
    ];

    // 상위 25개의 종목만 선택
    const top25Stocks = popularStocks.slice(0, 25);

    return ( 
        <>
            <Header />
            <Stocktype/>
            {/* 인기종목리스트 */}
            <div className='mx-auto max-w-[390px]'> 
                {/* map을 사용하여 상위 25개 종목 반복 렌더링 */}
                {top25Stocks.map(stock => (
                    <Eachpopularstock 
                        key={stock.id}
                        rank={stock.rank}
                        name={stock.name}
                        price={stock.price}
                        change={stock.change}
                        percentage={stock.percentage}
                    />
                ))}
            </div>
        </>
    );
}

export default Popularstock; 
