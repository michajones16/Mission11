import { useEffect, useState } from "react";
import type { Book } from "./types/Book";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/Book?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.numBooks);
            setTotalPages(Math.ceil(data.numBooks / pageSize));
        }
        fetchBooks();
    }, [pageSize, pageNum, sortOrder, totalItems]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Book List</h1>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        setPageNum(1);
                    }}
                >
                    Sort by Title {sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : ""}
                </button>

                <div className="d-flex align-items-center">
                    <label className="me-2 mb-0">Results per page:</label>
                    <select
                        className="form-select form-select-sm"
                        style={{ width: "auto" }}
                        value={pageSize}
                        onChange={(p) => {
                            setPageSize(Number(p.target.value));
                            setPageNum(1);
                        }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {books.map((book) => (
                    <div className="col-md-6 col-lg-4 mb-3" key={book.bookId}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                <p className="card-text mb-1"><strong>Publisher:</strong> {book.publisher}</p>
                                <p className="card-text mb-1"><strong>ISBN:</strong> {book.isbn}</p>
                                <p className="card-text mb-1"><strong>Classification:</strong> {book.classification}</p>
                                <p className="card-text mb-1"><strong>Category:</strong> {book.category}</p>
                                <p className="card-text mb-1"><strong>Page Count:</strong> {book.pageCount}</p>
                                <p className="card-text mb-0"><strong>Price:</strong> ${book.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
                            Previous
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                        <li className={`page-item ${pageNum === index + 1 ? "active" : ""}`} key={index}>
                            <button className="page-link" onClick={() => setPageNum(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${pageNum === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default BookList;