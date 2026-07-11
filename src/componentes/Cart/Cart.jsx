import React from 'react';
import { useCart } from '../../context/CartContext.jsx';  
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiTrash2, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';
import styles from './Cart.module.css';

const Cart = () => {
    const { cart, clearCart, getCartTotal, removeItem } = useCart();

    // Si el carrito está vacío, mostrar un mensaje
    if (cart.length === 0){
        return (
            <Container className="pt-5 mt-5 text-center">
                <div className={styles.vacioContainer}>
                    <FiShoppingBag size={50} className="mb-3 text-muted" />
                    <h1 className="mb-3">El carrito está vacío</h1>
                    <p className="text-muted mb-4">Agrega productos para continuar la compra.</p>
                    <Link to="/productos-nacionales" className={styles.buttonVolver}>
                        Ver Productos
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container className="pt-5 mt-4">
            <h1 className={styles.tituloPrincipal}>Carrito de Compras</h1>
            
            <Row className="mt-4">
                
                <Col xs={12} lg={8} className="mb-4">
                    <div className={styles.listaProductos}>
                        {cart.map(item => (
                            <div key={item.id} className={styles.cartCard}>
                                <div className={styles.cardInfoContainer}>
                                    
                                    <img 
                                        src={item.imagen || 'https://via.placeholder.com/80'} 
                                        alt={item.nombre} 
                                        className={styles.itemImg}
                                    />
                                    <div className={styles.itemDetalles}>
                                        <h4>{item.nombre}</h4>
                                        <p className={styles.cantPrecio}>
                                            Cantidad: <span>{item.quantity}</span> &bull; Unitario: <span>${item.precio}</span>
                                        </p>
                                        <p className={styles.subtotalText}>
                                            Subtotal: <strong>${(item.quantity * item.precio).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item.id)} className={styles.buttonEliminar} title="Eliminar del carrito">
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </Col>

                
                <Col xs={12} lg={4}>
                    <div className={styles.resumenContainer}>
                        <h3>Resumen de Compra</h3>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <span className={styles.totalLabel}>Total a pagar:</span>
                            <span className={styles.totalPrecio}>${getCartTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="d-flex flex-column gap-3">
                            <Link to="/" onClick={() => alert("¡Gracias por confiar en Aura Derm! Procesando tu compra...")} className={styles.buttonFinalizar}>
                                <FiCheckCircle /> Finalizar Compra
                            </Link>
                            <button onClick={clearCart} className={styles.buttonVaciar}>
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;