import Header from '../components/header';
import Stocktype from '../components/stocktype';

function Intereststock() {
    return ( <>
    <Header/>
    <Stocktype/>
    {/* 관심종목리스트 */}
    <div className='mx-auto max-w-[390px] px-4 sm:px-6 lg:px-8'> 
        {/* 각 종목 */}
        <div className='flex flex-row'>
            {/* 하트 */}
           <button className=''>
            하투찜
           </button>
            {/* 내용 */}
            <div className='' >
                {/* 종목이름 */}
                <h1 className=''>
                    NVIDIA
                </h1>
                {/* 종목정보 */}
                <div className='flex flex-row' >
                    <p className=''>23,000</p>
                    <p className=''>+1200</p>
                    <p className=''>(+8.8%)</p>
                </div>
            </div>
        </div>
    </div>
    </> );
  }
  
  export default Intereststock;