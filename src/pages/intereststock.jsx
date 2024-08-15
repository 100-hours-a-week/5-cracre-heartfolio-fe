import Header from '../components/header';
import Stocktype from '../components/stocktype';
import Eachintereststock from '../components/eachintereststock';

function Intereststock() {
    // 인기 종목 데이터 배열
    const interestStocks = [
        { id: 1, name: 'NVIDIA', price: '23,000', change: '+1200', percentage: '(+8.8%)' },
        { id: 2,  name: 'Apple', price: '150,000', change: '+3000', percentage: '(+2.0%)' },
        { id: 3,  name: 'Tesla', price: '50,000', change: '-2000', percentage: '(-3.5%)' },
        // ... 더 많은 종목 추가
        { id: 24,  name: 'Intel', price: '30,000', change: '+1000', percentage: '(+3.3%)' },
        { id: 25, name: 'AMD', price: '40,000', change: '+500', percentage: '(+1.3%)' }, // 26번째 종목 (표시되지 않음)
    ];

    return ( 
        <>
            <Header />
            <Stocktype/>
            {/* 인기종목리스트 */}
            <div className='mx-auto max-w-[390px] '> 
                {/* map을 사용하여 반복 렌더링 */}
                {interestStocks.map(stock => (
                    <Eachintereststock 
                        key={stock.id}
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
export default Intereststock;