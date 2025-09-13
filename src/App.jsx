import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/index"
import { Archive } from "./pages/Archive/index";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
}

export default App
