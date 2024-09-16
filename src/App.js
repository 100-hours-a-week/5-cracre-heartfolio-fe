import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/portfolioPage";
import Popularstock from "./pages/popularstock";
import Intereststock from "./pages/intereststock";
import SearchPage from "./pages/searchPage";
import StockPage from "./pages/stockPage";
import RankingPage from "./pages/rankingPage";
import MyPage from "./pages/myPage";
import CashChargePage from "./pages/cashChargePage";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import KakaoRedirect from "./pages/kakaoRedirect";
import Legal from "./pages/license";
import CashChargeSuccessPage from "./pages/cashChargeSuccessPage";
import CashChargeFailPage from "./pages/cashChargeFailPage";

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/stock/:id" element={<StockPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/cashcharge" element={<CashChargePage />} />
        <Route path="/success-payment" element={<CashChargeSuccessPage />} />
        <Route path="/fail-payment" element={<CashChargeFailPage />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </Router>
  );
}

export default App;
