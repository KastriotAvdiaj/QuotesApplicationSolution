import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Quotes } from "./Pages/Quotes/Quotes";
import { Books } from "./Pages/Books/Books";
import { Signup } from "./Pages/Signup/Signup";
import { QuotesProvider } from "./Components/Quotes/QuotesProvider";
import { BooksProvider } from "./Components/Books/BooksProvider";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "./Components/Theme/ThemeContext";
import { Login } from "./Pages/Login/Login";
import { AuthProvider } from "./Components/AuthContext/AuthContext";
import { AdminPanel } from "./Pages/Admin/AdminPanel";
import { Error } from "./Pages/Error/Error";
import { SingleBook } from "./Pages/Books/SingleBook/SingleBook";
import { Quotes2 } from "./Pages/Quotes2/Quotes2";
import { BookNotesSinglePage } from "./Pages/BookNotes/BookNotesSinglePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App-Container">
        <AuthProvider>
          <Sidebar />
          <div className="App">
            <QuotesProvider>
              <BooksProvider>
                <ThemeProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/quotes2" element={<Quotes2 />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/:bookName/Notes"
                      element={<BookNotesSinglePage />}
                    />

                    <Route
                      path="/books/singleBook/:bookId"
                      element={<SingleBook />}
                    />
                    <Route path="/error" element={<Error />} />
                  </Routes>
                </ThemeProvider>
              </BooksProvider>
            </QuotesProvider>
          </div>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
