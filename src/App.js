import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/portfolioPage";
import Popularstock from "./pages/popularstock";
import Intereststock from "./pages/intereststock";
import StockPage from "./pages/stockPage";
import RankingPage from "./pages/rankingPage";
import MyPage from "./pages/myPage";
import CashChargePage from "./pages/cashChargePage";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import KakaoRedirect from "./pages/kakaoRedirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth" element={<KakaoRedirect />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/intereststock" element={<Intereststock />} />
        <Route path="/popularstock" element={<Popularstock />} />
        <Route path="/stock=:stockName" element={<StockPage />} />        
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/cashcharge" element={<CashChargePage />} />
      </Routes>
    </Router>
  );
}

export default App;
