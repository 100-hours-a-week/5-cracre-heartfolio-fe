import { useState } from "react";
import ReactPaginate from "react-paginate";

function NewsBox(props) {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 수
  const itemsPerPage = 4; // 페이지당 보여줄 게시물 수
  const pageCount = Math.ceil(props.data?.length / itemsPerPage); // 총 페이지 수

  // 현재 페이지에 해당하는 데이터 가져오기
  const currentItems = props.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  function formattedDate(date) {
    return date.split(" ").slice(0, 5).join(" ");
  }

  // 다음 페이지로 이동하는 함수
  const handleNextClick = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pageCount);
  };

  // 이전 페이지로 이동하는 함수
  const handlePreviousClick = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? pageCount - 1 : prevPage - 1
    );
  };
  return (
    <>
      <div className="flex justify-end"></div>
      {/* 커스텀 Pagination 컴포넌트 */}
      <div className="flex justify-end">
        <div className="flex justify-around w-24">
          <button
            onClick={handlePreviousClick}
            className="text-gray-600 hover:text-black cursor-pointer"
          >
            이전
          </button>
          <button
            onClick={handleNextClick}
            className="text-gray-600 hover:text-black cursor-pointer"
          >
            다음
          </button>
        </div>
      </div>
      <div className="news-list w-[370px] flex flex-col items-center">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 py-4 flex flex-col w-[350px]"
          >
            <a
              href={item.link}
              className="font-semibold text-gray-700 hover:underline"
            >
              {item.title}
            </a>
            <div className="text-right text-sm mt-2">
              {formattedDate(item.pubDate)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsBox;
