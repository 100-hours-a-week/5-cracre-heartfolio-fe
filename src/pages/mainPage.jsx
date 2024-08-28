import { useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import ButtomNavigation from "../components/common/bottomNavigation";
import PopularChart from "../components/main/popularChart";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-[85px]">
      <div className="mx-auto w-[390px] px-3 ">
        <div>
            <PopularChart/> 
        </div>
      </div>
      </div>
      <ButtomNavigation />
    </div>
  );
}

export default MainPage;