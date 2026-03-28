import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalAmount = cart.reduce((total, item) => total + item.subtotal, 0);

    return (
        <div style={{
            position: "fixed",
            top: '10px',
            right: '20px',
            background: '#f8f9fa',
            padding: "10px 15px",
            borderTop: "1px solid #dee2e6",
            borderLeft: "1px solid #dee2e6",
            borderRadius: "8px",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            fontSize: '16px',
            zIndex: 1000,
        }}
            onClick={() => navigate('/cart')}
        ><i className="bi bi-cart"></i> <span className="badge bg-primary">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span> <strong>${totalAmount.toFixed(2)}</strong>
        </div>
    )
}

export default CartSummary;