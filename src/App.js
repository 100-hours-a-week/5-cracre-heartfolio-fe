import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/portfolio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/intereststock" element={<Portfolio />} />
        <Route path="/popularstock" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
