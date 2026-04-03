import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalAmount = cart.reduce((total, item) => total + item.subtotal, 0);

    return (
        <div className="cart-summary-tag" style={{
            position: "fixed",
            top: '15px',
            right: '25px',
            padding: "10px 18px",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '17px',
            zIndex: 1000,
        }}
            onClick={() => navigate('/cart')}
        ><i className="bi bi-cart-fill" style={{ marginRight: '8px' }}></i> <span className="badge bg-primary">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span> <strong>${totalAmount.toFixed(2)}</strong>
        </div>
    )
}

export default CartSummary;