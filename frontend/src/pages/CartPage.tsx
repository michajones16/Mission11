import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";
import WelcomeBand from "../components/WelcomeBand";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    return (
        <>
            <WelcomeBand />
            <h2 className="text-center">Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p className="text-center text-muted mt-4">Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map((item: CartItem) => (
                            <div className="row" key={item.bookID}>
                                <div className="card w-75 mx-auto shadow-sm">
                                    <div className="d-flex align-items-center">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text mb-0"><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                                            <p className="card-text mb-0"><strong>Quantity:</strong> {item.quantity}</p>
                                            <p className="card-text mb-0"><strong>Subtotal:</strong> ${item.subtotal.toFixed(2)}</p>
                                        </div>
                                        <button
                                            className="btn btn-danger me-3"
                                            style={{ width: '45px', height: '45px', padding: 0 }}
                                            onClick={() => removeFromCart(item.bookID)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <br />
            <h3 className="text-center mb-4">Total: ${cart.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}</h3>
            <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-success shop-btn">Checkout</button>
                <button className="btn btn-primary shop-btn" onClick={() => navigate('/books')}>Continue Shopping</button>
            </div>
        </>
    )
}

export default CartPage;