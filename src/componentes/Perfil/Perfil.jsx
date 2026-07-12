import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiLogOut, FiHeart, FiUser, FiArrowRight } from 'react-icons/fi';
import styles from './Perfil.module.css';

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [favoritos, setFavoritos] = useState([]);

    // Cargar los favoritos que el usuario tiene guardados localmente
    useEffect(() => {
        const favoritosGuardados = JSON.parse(localStorage.getItem(`favoritos_${user?.uid}`)) || [];
        setFavoritos(favoritosGuardados);
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const removerDeFavoritos = (id) => {
        const nuevosFavoritos = favoritos.filter(prod => prod.id !== id);
        setFavoritos(nuevosFavoritos);
        localStorage.setItem(`favoritos_${user?.uid}`, JSON.stringify(nuevosFavoritos));
    };

    return (
        <Container className="pt-5 mt-4">
            {/* Panel de Información del Usuario */}
            <div className={styles.perfilCard}>
                <Row className="align-items-center">
                    <Col xs={12} md={8} className="d-flex align-items-center gap-4 flex-wrap flex-md-nowrap justify-content-center justify-content-md-start">
                        <div className={styles.userAvatar}>
                            <FiUser size={40} />
                        </div>
                        <div className={styles.userInfo}>
                            <h1>Mi Perfil</h1>
                            <h2>¡Hola de nuevo, <span className={styles.emailHighlight}>{user?.email}</span>!</h2>
                            <p className={styles.userRol}>Rol: {user?.rol === 'admin' ? 'Administrador' : 'Cliente'}</p>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="text-center text-md-end mt-3 mt-md-0">
                        <button onClick={handleLogout} className={styles.botonLogout}>
                            <FiLogOut /> Cerrar Sesión
                        </button>
                    </Col>
                </Row>
            </div>

            {/* Sección de Favoritos */}
            <div className={styles.favoritosSeccion}>
                <h3 className={styles.seccionTitulo}>
                    <FiHeart className={styles.iconoCorazon} /> Mis Productos Favoritos
                </h3>
                
                {favoritos.length === 0 ? (
                    <div className={styles.noFavoritos}>
                        <p>Aún no has guardado ningún producto en tus favoritos.</p>
                        <Link to="/productos-nacionales" className={styles.linkTienda}>
                            Explorar Catálogo <FiArrowRight />
                        </Link>
                    </div>
                ) : (
                    <Row>
                        {favoritos.map(prod => (
                            <Col key={prod.id} xs={12} sm={6} lg={4} className="mb-4">
                                <Card className={styles.favCard}>
                                    <div className={styles.favImgWrapper}>
                                        <Card.Img variant="top" src={prod.imagen || 'https://via.placeholder.com/150'} alt={prod.nombre} />
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className={styles.favTitulo}>{prod.nombre}</Card.Title>
                                        <Card.Text className={styles.favPrecio}>${prod.precio}</Card.Text>
                                        
                                        <div className="d-flex gap-2 mt-auto">
                                            <Link to={`/productos-nacionales/${prod.id}`} className={styles.botonVer}>
                                                Ver Detalle
                                            </Link>
                                            <button 
                                                onClick={() => removerDeFavoritos(prod.id)} 
                                                className={styles.botonQuitar} 
                                                title="Quitar de favoritos"
                                            >
                                                <FiHeart className={styles.corazonLleno} />
                                            </button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </Container>
    );
};

export default Perfil;