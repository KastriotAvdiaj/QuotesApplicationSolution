import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Quotes } from "./Pages/Quotes";
import { QuotesProvider } from "./Components/Quotes/QuotesProvider";
import { Home } from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App-Container">
        <Sidebar />
        <div className="App">
          <QuotesProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quotes" element={<Quotes />} />
            </Routes>
          </QuotesProvider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
