import { useEffect, useState } from "react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ContructionAnimation from "../assets/animations/construction.json";
import SearchBox from "../components/mock investment/searchBox";
import Popularstock from "./popularstock";
import PopularChart from "../components/main/popularChart";
import useFetch from "../hooks/useFetch";

function SearchPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 검색창에서 값이 변경될 때마다 searchTerm 상태 업데이트
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색어가 변경될 때마다 검색 수행
  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
        try {
          const response = await fetch(
            `https://heartfolio.site/api/stock/search?keyword=${searchTerm}`
          );

          if (!response.ok) {
            throw new Error(response.statusText); // 응답이 정상적이지 않으면 에러 발생
          }

          const result = await response.json();
          setData(result); // 가져온 데이터를 상태에 설정
        } catch (err) {
          setError(err); // 에러 발생 시 상태에 설정
        } finally {
          setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
        }
      };

      fetchData();
    }
  }, [searchTerm]); // searchTerm이 변경될 때마다 useEffect 실행

  const { data: popularstock } = useFetch(
    "https://heartfolio.site/api/stock/popular?limit=" + 5
  );
function handleSearch(){
  setSearchTerm("");
}
function handleStock(get_id){
  navigate(`/stock/${get_id}`);
}
  return (
    <>
      <Header />
      <div className="pt-[60px] text-center  bg-white  min-h-screen">
        <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
          <div className="flex ">
            {/* 뒤로가기 */}
            <img
              src="/assets/images/back.png"
              className="h-[20px] m-2 mx-6"
              onClick={() => navigate(-1)}
            ></img>

            {/* 검색창 */}
            <div className="search">
              <input
                placeholder="검색어를 입력하세요"
                className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleInputChange} // onChange 이벤트 핸들러 추가
                value={searchTerm} // 입력된 값을 표시
              />
            </div>

            {/* 돋보기 */}
            {searchTerm.length == 0 ? (<span className="material-symbols-outlined m-2 mx-4 cursor-pointer">search</span>) : (<div className="cursor-pointer content-center ml-3 text-gray-400" onClick={handleSearch}>취소</div>)}
          </div>

          {/* 검색목록 */}
          <div className="flex flex-col py-5 pb-14">
            {searchTerm.length == 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-600 text-lg pb-3">추천 검색어</div>
                {popularstock?.map((stock) => (
                  <div className="p-2 text-gray-500" key={stock.stockId}>
                    {stock.koreanName} ({stock.englishName})
                  </div>
                ))}
              </div>
            ) : loading ? (
              <p>Loading...</p>
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <div key={item.stockId} className="w-[250px] pb-3">
                  {/* 데이터를 출력하는 부분 */}
                  <SearchBox
                    engName={item.englishName}
                    korName={item.koreanName}
                    onClick={()=>handleStock(item.stockId)}
                  />
                </div>
              ))
            ) : (
              <p className="pt-4">입력하신 검색어를 찾을 수 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default SearchPage;