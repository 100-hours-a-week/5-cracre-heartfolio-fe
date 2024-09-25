import MyLuck from "./myLuck";
import { useState } from "react";

function LuckyBox(props) {
  const [showLuck, setShowLuck] = useState(false); 

  return (
    <div>
      {!showLuck ? ( // showLuck이 false일 때 LuckyBox 내용 표시
        <div
          className="flex justify-center pt-[20px] mt-2 h-20 rounded-xl bg-gradient-to-r from-amber-200/50 to-pink-200/50"
          onClick={() => setShowLuck(true)} // 클릭 시 MyLuck 보여주도록 상태 변경
        >
          <p className="text-lg ml-[10px] text-gray-600 font-TmoneyRoundWindExtraBold">
            {props.title}
          </p>
        </div>
      ) : (
        <MyLuck /> // showLuck이 true일 때 MyLuck 표시
      )}
    </div>
  );
}

export default LuckyBox;
