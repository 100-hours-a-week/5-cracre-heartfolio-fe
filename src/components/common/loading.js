import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json"

export function Loading() {
  return (
    <div className="flex h-[210px] justify-center">
      <div className="w-28 h-28 mt-8">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}