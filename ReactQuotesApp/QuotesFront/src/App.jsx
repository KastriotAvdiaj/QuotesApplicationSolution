import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Quotes } from "./Pages/Quotes";
import { QuotesProvider } from "./Components/Quotes/QuotesProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <QuotesProvider>
          <Routes>
            <Route path="/quotes" element={<Quotes />} />
          </Routes>
        </QuotesProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
