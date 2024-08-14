import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/portfolio";
import Popularstock from "./pages/popularstock";
import Intereststock from "./pages/intereststock";
import StockPage from "./pages/stockPage";
import RankingPage from "./pages/rankingPage";
import MyPage from "./pages/myPage";
import CashChargePage from "./pages/cashChargePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/intereststock" element={<Intereststock />} />
        <Route path="/popularstock" element={<Popularstock />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/cashcharge" element={<CashChargePage />} />
      </Routes>
    </Router>
  );
}

export default App;
