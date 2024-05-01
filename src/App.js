import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, Suspense, lazy } from "react";

const SearchPage = lazy(() => import('./components/SearchPage'));
const ListBooks = lazy(() => import('./components/ListBooks'));


function App() {
  const [bookShelf, setBookShelf] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<>Loading...</>}>
            <ListBooks handleGetBooks={setBookShelf} />
          </Suspense>
        }></Route>
        <Route path="/search" element={
          <Suspense fallback={<>Loading...</>}>
            <SearchPage listBooks={bookShelf} />
          </Suspense>
        }></Route>
      </Routes>
    </Router>
  );
}

export default App;
