import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";

function ShopPage() {
    const navigate = useNavigate();
    const { title, bookID } = useParams();
    const { addToCart } = useCart();
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(
                `https://localhost:5000/Book/AllBooks?pageSize=1000&pageNum=1&sortOrder=asc`
            );
            const data = await response.json();
            const book = data.books.find((b: { bookID: number }) => b.bookID === Number(bookID));
            if (book) {
                setPrice(book.price);
            }
        };
        fetchBook();
    }, [bookID]);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "No book found",
            price,
            quantity,
            subtotal: price * quantity
        };
        addToCart(newItem);
        setShowToast(true);

        setTimeout(() => navigate('/cart'), 1000);
    };

    return (
        <>
            <WelcomeBand />
            <h2 className="text-center">Add <em>{title}</em> to Cart</h2>
            <p className="text-center mb-4 text-muted border-bottom w-50 mx-auto pb-3">Price: ${price.toFixed(2)}</p>
            <div className="d-flex gap-2 justify-content-center">
                <input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(x) => setQuantity(Number(x.target.value))}
                />
                <button className="btn btn-primary shop-btn" onClick={handleAddToCart}><i className="bi bi-cart-fill me-2"></i> Add to Cart</button>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary mt-3 shop-btn" onClick={() => navigate(-1)}>Back to Books</button>
            </div>

            {/* Toast notification */}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div className={`toast ${showToast ? 'show' : ''}`} role="alert">
                    <div className="toast-header bg-success text-white">
                        <strong className="me-auto">
                            <i className="bi bi-check-circle"></i> Success
                        </strong>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowToast(false)}
                        ></button>
                    </div>
                    <div className="toast-body">
                        <strong>{title}</strong> was added to your cart!
                    </div>
                </div>
            </div>

        </>
    );
};

export default ShopPage;