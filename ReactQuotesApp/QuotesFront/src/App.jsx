import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Quotes } from "./Pages/Quotes/Quotes";
import { Books } from "./Pages/Books/Books";
import { Signup } from "./Pages/Signup/Signup";
import { QuotesProvider } from "./Components/Quotes/QuotesProvider";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "./Components/Theme/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App-Container">
        <Sidebar />
        <div className="App">
          <QuotesProvider>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/books" element={<Books />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </ThemeProvider>
          </QuotesProvider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
