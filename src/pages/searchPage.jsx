import ButtomNavigation from "../components/bottomNavigation";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";


function SearchPage() {
  const navigate = useNavigate();

  // 검색창에서 엔터치면 searchPost()실행
  const enterkeySearch = (event) => {
    if (event.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    // 검색 기능을 수행하는 코드
    console.log('Search initiated');
  };

  return (
    <>
      <Header />
      <div className="mt-[80px] text-center">
        <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
            <div className="flex ">
              {/* 뒤로가기 */}
              <img
                src="/assets/images/back.png"
                className="h-[20px] m-2 mx-6"
                onClick={() => navigate(-1)}
              ></img>              

              {/* 검색창 */}
              <div class="search w-full">
                <input  placeholder="검색어를 입력하세요"         
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onKeyDown={enterkeySearch()} 
                />
              </div> 

              {/* 돋보기 */}
              <span className="material-symbols-outlined  m-2 mx-4">
                search
              </span>
            </div>
            {/* 검색목록 */}
            <div>
                검색목록
            </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default SearchPage;
