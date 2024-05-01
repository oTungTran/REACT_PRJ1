import { update } from '../BooksAPI';
import BookShelfChanger from "./BookShelfChanger"
import { useNavigate } from "react-router-dom";


function Book({ bookInfor }) {
    const navigate = useNavigate();

    async function handleSelect({ target }) {
        try {
            await update(bookInfor, target.value)
            navigate(0);
        } catch (error) {
            window.alert(error.message);
        }
    };

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: bookInfor.imageLinks.thumbnail ? `url(${bookInfor.imageLinks.thumbnail})` : "",
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <BookShelfChanger onSelectionChanged={handleSelect} value={bookInfor.shelf ?? "none"}></BookShelfChanger>
                </div>
            </div>
            <div className="book-title">{bookInfor.title}</div>
            <div className="book-authors">{bookInfor.authors}</div>
        </div>
    )
}


export default Book;
