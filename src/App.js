import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/portfolio";
import Popularstock from "./pages/popularstock";
import Intereststock from "./pages/intereststock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/intereststock" element={<Intereststock />} />
        <Route path="/popularstock" element={<Popularstock />} />
      </Routes>
    </Router>
  );
}

export default App;
