import React from "react";

function CategoryModal(props) {
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-box bg-white w-[460px]">
        <button
          onClick={props.onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold font-TmoneyRoundWindExtraBold text-center text-gray-600 text-[25px]">
          기부 영역 선택
        </h3>
        <div>
          <div className="flex justify-around items-center my-5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => props.onSelectCategory("교육")}
            >
              <img
                src="/assets/images/school.png"
                alt="교육"
                className="w-24 h-24"
              />
              <div className="text-gray-600 mt-2">교육</div>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => props.onSelectCategory("사회참여")}
            >
              <img
                src="/assets/images/world.png"
                alt="사회참여"
                className="w-24 h-24"
              />
              <div className="text-gray-600 mt-2">사회참여</div>
            </div>
          </div>
          <div className="flex justify-around items-center my-5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => props.onSelectCategory("문화")}
            >
              <img
                src="/assets/images/performing.png"
                alt="문화"
                className="w-24 h-24"
              />
              <div className="text-gray-600 mt-2">문화</div>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => props.onSelectCategory("환경")}
            >
              <img
                src="/assets/images/holding-hand.png"
                alt="환경"
                className="w-24 h-24"
              />
              <div className="text-gray-600 mt-2">환경</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
