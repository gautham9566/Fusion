import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";
import './style.css';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Add" element={<Add/>}/>
        <Route path="/Update/:id" element={<Update/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
