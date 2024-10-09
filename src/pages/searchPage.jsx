import { useEffect, useState } from "react";
import ButtomNavigation from "../components/common/bottomNavigation";
import Header from "../components/common/header";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ContructionAnimation from "../assets/animations/construction.json";
import SearchBox from "../components/mock investment/searchBox";
import useFetch from "../hooks/useFetch";
import { Loading } from "../components/common/loading";

function SearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [searchUrl, setSearchUrl] = useState(""); // 검색 API URL 관리
  const { data, error, loading } = useFetch(searchUrl); // 검색 결과에 따라 fetch
  const [popularstock, setPopularstock] = useState([]); // popularstock을 상태로 관리

  // 검색창에서 값이 변경될 때마다 searchTerm 상태 업데이트
  const handleInputChange = (event) => {
    const value = event.target.value;
    // 정규식으로 기호를 제거 (영문, 숫자, 한글만 허용)
    const filteredValue = value.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]/g, "");
    setSearchTerm(filteredValue);
  };

  const { data: popularstockData, error: popularstockError } = useFetch(
    `${process.env.REACT_APP_API_URI}/stock/popular?limit=` + 5
  );

  // 검색어가 변경될 때마다 searchUrl 업데이트
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setSearchUrl(
        `${process.env.REACT_APP_API_URI}/stock/search?keyword=${searchTerm}`
      );
    } else {
      setSearchUrl("");
    }
  }, [searchTerm]);

  function handleSearch() {
    setSearchTerm("");
  }
  function handleStock(get_id) {
    navigate(`/stock/${get_id}`);
  }

  useEffect(() => {
    if (popularstockData && !popularstockError) {
      setPopularstock(popularstockData);
    } else {
      setPopularstock([
        {
          stockId: 4,
          koreanName: "마이크로소프트",
          englishName: "Microsoft Corporation",
        },
        {
          stockId: 8,
          koreanName: "엔비디아",
          englishName: "NVIDIA Corporation",
        },
        {
          stockId: 25,
          koreanName: "코카콜라",
          englishName: "The Coca-Cola Company",
        },
        {
          stockId: 21,
          koreanName: "어도비",
          englishName: "Adobe Inc.",
        },
        {
          stockId: 34,
          koreanName: "맥도날드",
          englishName: "McDonald’s Corporation",
        },
      ]);
    }
  }, [popularstockData, popularstockError]);

  return (
    <>
      <Header />
      <div className="pt-[60px] text-center  bg-white  min-h-screen">
        <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
          <div className="flex ">
            {/* 뒤로가기 */}
            <img
              src="/assets/images/back.png"
              className="h-[20px] m-2 mx-6 cursor-pointer"
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
            {searchTerm.length == 0 ? (
              <span className="material-symbols-outlined m-2 mx-4 cursor-pointer">
                search
              </span>
            ) : (
              <div
                className="cursor-pointer content-center ml-3 text-gray-400"
                onClick={handleSearch}
              >
                취소
              </div>
            )}
          </div>
          {/* 검색목록 */}
          <div
            className="flex flex-col mt-5 overflow-y-auto scrollbar-hide"
            style={{ height: "calc(100dvh - 205px)" }}
          >
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
              <Loading />
            ) : Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <div key={item.stockId} className="w-[250px] pb-3">
                  {/* 데이터를 출력하는 부분 */}
                  <SearchBox
                    engName={item.englishName}
                    korName={item.koreanName}
                    onClick={() => handleStock(item.stockId)}
                  />
                </div>
              ))
            ) : error ? (
              <p className="min-h-screen bg-white text-center">
                Error: {error.message}
              </p>
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
