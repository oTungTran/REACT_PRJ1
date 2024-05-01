import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react"

import { search } from '../BooksAPI';
import BookGrid from "./BooksGrid";

function SearchPage({ listBooks = [] }) {
    const [paramSearch, setParamSearch] = useState("");
    const [books, setBooks] = useState("");
    const debounceInput = useRef();

    useEffect(() => {
        if (!paramSearch.trim() || !listBooks.length) return;
        async function handleSearch(query) {
            try {
                const maxResults = 10
                const res = await search(query, maxResults);
                if (!Array.isArray(res)) {
                    throw res?.error ?? "Internal Server Error";
                };
                res.forEach(item => {
                    item.shelf = listBooks.find(book => book.id === item.id)?.shelf ?? 'none';
                })
                setBooks(res);
            } catch (error) {
                setBooks([]);
                window.alert(error)
            }
        };
        clearTimeout(debounceInput.current);
        debounceInput.current = setTimeout(() => handleSearch(paramSearch), 300);
    }, [paramSearch, listBooks])

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={paramSearch}
                        autoFocus
                        onChange={(e) => setParamSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {!!books.length && <BookGrid lstBooks={books}></BookGrid>}
            </div>
        </div>
    )
}


export default SearchPage;
