import { useState } from "react";
import ButtomNavigation from "../components/bottomNavigation";
import Header from "../components/header";
import UserRanking from "../components/ranking/userRanking";

// function RankingPage() {
//   const [activeTab, setActiveTab] = useState(1);

//   return (
//     <>
//       <Header />
//       <div className="mt-[90px] text-center">
//         <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
//           <div
//             role="tablist"
//             className="tabs tabs-boxed mx-auto max-w-[370px] mt-[34px] bg-white"
//           >
//             <a
//               role="tab"
//               className={`tab h-[50px] text-base ${
//                 activeTab === 1 ? "bg-btnClickColor" : "bg-white"
//               }`}
//               onClick={() => setActiveTab(1)}
//             >
//               사용자 랭킹
//             </a>
//             <a
//               role="tab"
//               className={`tab h-[50px] text-base ${
//                 activeTab === 2 ? "bg-btnClickColor" : "bg-white"
//               }`}
//               onClick={() => setActiveTab(2)}
//             >
//               기부 랭킹
//             </a>
//           </div>
//           <div className="mx-auto max-w-[370px] p-1">
//             <div role="tabpanel" className="tab-content block w-[370px]">
//               {activeTab === 1 && <UserRanking />}
//               {/* {activeTab === 2 && <TransactionHistory />} */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ButtomNavigation />
//     </>
//   );
// }
function RankingPage() {
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
export default RankingPage;
