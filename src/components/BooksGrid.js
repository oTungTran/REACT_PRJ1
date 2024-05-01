import Book from "./Book";

function BookGrid({ lstBooks }) {
    return (
        <ol className="books-grid">
            {
                lstBooks?.map(book => {
                    return <Book key={book.id} bookInfor={book} />;
                })
            }
        </ol>
    );
}

export default BookGrid;