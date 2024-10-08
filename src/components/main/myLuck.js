import Lottie from "lottie-react";
import dotLoadingAnimation from "../../assets/animations/dotLoading.json";

function MyLuck(props) {
  return (
    <>
      <div
        className={`flex items-center justify-center pt-[20px] h-20 p-6 mt-2 rounded-xl bg-gradient-to-r from-amber-200/50 to-pink-200/50 ${
          props.ok ? "font-RixXladywatermelonR" : "font-semibold text-gray-600"
        }`}
      >
        {props.loading ? (
          <Lottie animationData={dotLoadingAnimation} loop={true} />
        ) : (
          <div
            className={`${
              props.ok
                ? "font-RixXladywatermelonR text-gray-600"
                : "font-semibold text-gray-600"
            }
              ${props.data.length>28 ? "text-sm" : "text-base"}`}
          >
            {props.data}
          </div>
        )}
      </div>
    </>
  );
}

export default MyLuck;
