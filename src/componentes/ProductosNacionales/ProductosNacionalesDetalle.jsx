import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext.jsx'; 
import { useAuth } from '../../context/AuthContext.jsx'; 
import { Helmet } from 'react-helmet'; 
import { Container, Row, Col } from 'react-bootstrap';
import { FiHeart, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import styles from './ProductosNacionalesDetalle.module.css';

const ProductosNacionalesDetalle = () => {
    const [prod, setItem] = useState(null);
    const { id } = useParams();
    const [esFavorito, setEsFavorito] = useState(false);
    
    const { cart, addToCart } = useCart(); 
    const { user } = useAuth(); 

    const productoEnCarrito = cart.find(item => item.id === id);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.quantity : 0;

    // Carga de especificaciones del producto desde Firestore
    useEffect(() => {
        if (id) {
            const docRef = doc(db, "productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) {
                        const productoData = { ...resp.data(), id: resp.id };
                        setItem(productoData);

                        // 3. COMPROBAMOS SI YA ERA FAVORITO AL CARGAR LA PÁGINA
                        if (user) {
                            const favsActuales = JSON.parse(localStorage.getItem(`favoritos_${user.uid}`)) || [];
                            const existe = favsActuales.some(item => item.id === resp.id);
                            setEsFavorito(existe);
                        }
                    } else {
                        console.error("No se encontró el documento con id:", id);
                    }
                })
                .catch((err) => {
                    console.error("Error al obtener el documento:", err);
                });     
        }
    }, [id, user]);


    const marcarComoFavorito = () => {
        if (!user) {
            alert("⚠️ Debes iniciar sesión para poder guardar productos en tus favoritos.");
            return;
        }

        const proximaCondicion = !esFavorito;
        setEsFavorito(proximaCondicion);
        
        // Buscamos los favoritos guardados en este navegador vinculados al UID del usuario
        const favsActuales = JSON.parse(localStorage.getItem(`favoritos_${user.uid}`)) || [];
        
        if (proximaCondicion) {
            // Modo Guardar: Agregamos el objeto completo del producto para que el Perfil pueda leer sus campos
            favsActuales.push(prod);
            localStorage.setItem(`favoritos_${user.uid}`, JSON.stringify(favsActuales));
            alert("Añadido a favoritos ⭐");
        } else {
            // Modo Remover: Filtramos la lista para quitarlo
            const filtrados = favsActuales.filter(item => item.id !== prod.id);
            localStorage.setItem(`favoritos_${user.uid}`, JSON.stringify(filtrados));
            alert("Eliminado de favoritos");
        }
    };

    const handleAddToCart = () => {
        if (prod) {
            addToCart(prod, 1); 
            alert(`¡Se agregó ${prod.nombre} al carrito! 🛒`);
        }
    };

    return (
        <Container className="pt-5 mt-4">
            {prod && (
                <Helmet>
                    <title>Aura Derm | {prod.nombre}</title>
                    <meta name="description" content={`Detalles de ${prod.nombre}. ${prod.descripcion}`} />
                </Helmet>
            )}

            <Link to="/productos-nacionales" className={styles.botonVolver}>
                <FiArrowLeft /> Volver al catálogo
            </Link>

            <div className={styles.detalleContainer}>
                {prod ? (
                    <Row className="align-items-center">
                        <Col xs={12} md={5} className="text-center mb-4 mb-md-0">
                            <div className={styles.imagenWrapper}>
                                <img 
                                    src={prod.imagen || 'https://via.placeholder.com/400'} 
                                    alt={prod.nombre} 
                                    className={styles.productoImagen} 
                                />
                            </div>
                        </Col>

                        <Col xs={12} md={7}>
                            <div className={styles.cartaDetalle}>
                                <span className={styles.categoriaTag}>{prod.categoria || 'Nacional'}</span>
                                <h2 className={styles.productoTitulo}>{prod.nombre}</h2>
                                <p className={styles.productoDescripcion}>{prod.descripcion}</p>
                                <h3 className={styles.productoPrecio}>${prod.precio ? prod.precio.toFixed(2) : '0.00'}</h3>
                                
                                <div className={styles.favoritoSeccion} onClick={marcarComoFavorito}>
                                    <FiHeart className={esFavorito ? styles.corazonLleno : styles.corazonVacio} />
                                    <span>{esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
                                </div>

                                <button className={styles.botonAgregar} onClick={handleAddToCart}>
                                    <FiShoppingCart /> Agregar al Carrito
                                </button>

                                {cantidadActual > 0 && (
                                    <p className={styles.cantidadAviso}>
                                        Ya tenés {cantidadActual} {cantidadActual === 1 ? 'unidad' : 'unidades'} en el carrito
                                    </p>
                                )}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <p className={styles.loading}>Cargando especificaciones del producto...</p>
                )}
            </div>
        </Container>
    );
};

export default ProductosNacionalesDetalle;