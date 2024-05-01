import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import BookGrid from "./BooksGrid";

import { getAll } from "../BooksAPI";

function ListBooks({ handleGetBooks }) {
    const [lstBooks, setLstBooks] = useState({});
    const shelfLst = {
        'currentlyReading': 'Currently Reading',
        'wantToRead': 'Want to Read',
        'read': 'Read',
        'none': 'None',
    };

    useEffect(() => {
        async function handleGetAllBook() {
            try {
                const res = await getAll();
                if (!Array.isArray(res)) return;
                handleGetBooks(res);
                console.log(res);
                const dividedByShelf = res.reduce((prev, curr) => {
                    const shelf = curr?.shelf ?? 'none';
                    const updatedCurr = { ...curr, shelf };
                    prev[shelf] = prev[shelf] || [];
                    prev[shelf].push(updatedCurr);
                    return prev;
                }, {});

                setLstBooks({ ...dividedByShelf });
                console.log(dividedByShelf);
            } catch (error) {
                window.alert(error)
            }
        };
        handleGetAllBook();
    }, [handleGetBooks]);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">

                {Object.keys(lstBooks).map(item => {
                    return <div className="bookshelf" key={item}>
                        <h2 className="bookshelf-title">
                            {shelfLst[item]}
                        </h2>
                        <div className="bookshelf-books">
                            <BookGrid lstBooks={lstBooks[item]} />
                        </div>
                    </div>
                })}

            </div>
            <div className="open-search">
                <Link to="/search" >Add a book</Link>
            </div>
        </div >
    );
}

export default ListBooks;