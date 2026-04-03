import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("");
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.numBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }
        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mt-4">

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
            </div>

            <div className="row">
                {books.map((book) => (
                    <div className="col-md-6 col-lg-4 mb-3" key={book.bookID}>
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

                            <button
                                className="btn btn-success shop-btn mx-auto d-block mb-3 mt-auto"
                                onClick={() => navigate(`/shop/${book.title}/${book.bookID}`)}
                            >
                                <i className="bi bi-cart-fill me-2"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
                <Pagination
                    currentPage={pageNum}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setPageNum}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setPageNum(1);
                    }}
                />
            </div>
        </div>
    );
}

export default BookList;