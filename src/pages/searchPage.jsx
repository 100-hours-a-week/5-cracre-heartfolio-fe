import { useEffect, useState } from "react";
import ButtomNavigation from "../components/bottomNavigation";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

// function SearchPage() {
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 검색창에서 엔터치면 searchTerm 상태 업데이트
//   const enterkeySearch = (event) => {
//     if (event.key === 'Enter') {
//       setSearchTerm(event.target.value); // 검색어 상태 업데이트
//     }
//   };

//   // 검색어가 변경될 때마다 검색 수행
//   useEffect(() => {
//     if (searchTerm) {
//       const fetchData = async () => {
//         setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
//         try {
//           const response = await fetch(
//             `https://heartfolio.site/api/stocks/search?keyword=${searchTerm}`,
//           );
  
//           if (!response.ok) {
//             throw new Error(response.statusText); // 응답이 정상적이지 않으면 에러 발생
//           }
  
//           const result = await response.json();
//           setData(result); // 가져온 데이터를 상태에 설정
//           console.log(result); // 가져온 데이터 콘솔에 출력
//         } catch (err) {
//           setError(err); // 에러 발생 시 상태에 설정
//         } finally {
//           setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
//         }
//       };
  
//       fetchData();
//     }
//   }, [searchTerm]); // searchTerm이 변경될 때마다 useEffect 실행

//   return (
//     <>
//       <Header />
//       <div className="mt-[80px] text-center  bg-white">
//         <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
//             <div className="flex ">
//               {/* 뒤로가기 */}
//               <img
//                 src="/assets/images/back.png"
//                 className="h-[20px] m-2 mx-6"
//                 onClick={() => navigate(-1)}
//               ></img>              

//               {/* 검색창 */}
//               <div className="search w-full">
//                 <input  placeholder="검색어를 입력하세요"         
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 onKeyDown={enterkeySearch} 
//                 />
//               </div> 

//               {/* 돋보기 */}
//               <span className="material-symbols-outlined  m-2 mx-4">
//                 search
//               </span>
//             </div>

//             {/* 검색목록 */}
//             <div>
//                 {loading && <p>Loading...</p>}
//                 {error && <p>Error: {error.message}</p>}
//                 {data && data.length > 0 ? (
//                   data.map((item, index) => (
//                     <div key={index}>
//                       {/* 데이터를 출력하는 부분 */}
//                       <p>{item.name}</p> {/* 예시로 name 속성 출력 */}
//                     </div>
//                   ))
//                 ) : (
//                   <p>No results found</p>
//                 )}
//             </div>
//         </div>
//       </div>
//       <ButtomNavigation />
//     </>
//   );
// }

function SearchPage() {
  return (
    <>
      <Header />
      <div className="pt-[90px] min-h-screen bg-white text-center">
        <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
          아직 제공되지 않는 서비스입니다.
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default SearchPage;