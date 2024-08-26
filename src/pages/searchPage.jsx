import ButtomNavigation from "../components/bottomNavigation";
import Header from "../components/header";

function SearchPage() {
  return (
    <>
      <Header />
      <div className="mt-[80px] text-center">
        <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
            <div className="mx-auto max-w-[390px] h-[50px] px-3 items-center flex justify-between">
            <img
                src="/assets/images/back.png"
                className="h-[20px]"
                onClick={() => navigate(-1)}
            ></img>
            <div >
                <input
                        id="search"
                        name="search"
                        type="search"
                        placeholder="Search"
                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
            </div>
            <img
                src={src}
                className="h-[20px]"
                onClick={() => handlefavorite()}
            ></img>
            </div>
            <div>
                검색내용
            </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default SearchPage;
