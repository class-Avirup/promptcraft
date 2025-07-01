import "./App.css";
import Start from "./start.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PromptForm from "./components/form.jsx";
import PromptDetail from "./components/promptDetail.jsx";
import HookWriter from "./hookwriter.jsx";
import About from "./About.jsx";
import Error from "./error.jsx";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/post" element={<PromptForm />} />
          <Route path="/prompt/:title" element={<PromptDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/hook" element={<HookWriter />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
