import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/index"
import { Archive } from "./pages/Archive/index";
import { Bin } from "./pages/Bin/index";
import { Important } from "./pages/Important/index";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/bin" element={<Bin />} />
      <Route path="/important" element={<Important />} />
    </Routes>
  );
}

export default App
