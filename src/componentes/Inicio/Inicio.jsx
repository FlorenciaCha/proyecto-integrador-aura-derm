import React, { useState, useEffect } from "react";
import Servicios from "../Servicios/Servicios";
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase/config.jsx'; 
import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import { FiTrendingUp, FiShield, FiHeart, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';
import styles from "./inicio.module.css"; 

// ==========================================
// COMPONENTES ESTILIZADOS PARA EL INICIO
// ==========================================

const TituloSeccion = styled.h2`
  color: var(--color-terciario);
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
  font-size: 2rem;
`;

const SubtituloSeccion = styled.p`
  color: var(--text-color);
  opacity: 0.7;
  text-align: center;
  margin-bottom: 40px;
  font-size: 1rem;
`;

const StyledCarousel = styled(Carousel)`
  max-width: 900px;
  margin: 0 auto;

  .carousel-indicators [data-bs-target] {
    background-color: var(--color-terciario);
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: var(--color-terciario);
    border-radius: 50%;
    padding: 20px;
    background-size: 50%;
  }
`;

const CarouselCard = styled.div`
  display: flex;
  background-color: #ffffff;
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  align-items: center;
  gap: 30px;
  margin: 10px 50px; /* Margen para que no tape las flechas */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);

  .img-container {
    flex: 1;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  .info-container {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .tag-nuevo {
    background-color: var(--color-secundario);
    color: var(--color-terciario);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    width: fit-content;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--text-color);
    font-weight: 500;
    margin-bottom: 10px;
  }

  .price {
    font-size: 1.4rem;
    color: var(--color-acento);
    font-weight: 600;
    margin-bottom: 15px;
  }

  .btn-ver {
    background-color: var(--color-primario);
    color: var(--text-color);
    padding: 10px 24px;
    border-radius: var(--border-radius-md);
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-terciario);
      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin: 10px 20px;
    
    .info-container {
      align-items: center;
      text-align: center;
    }
  }
`;

const FeatureCard = styled(Card)`
  border: none !important;
  background-color: transparent;
  text-align: center;
  padding: 20px;

  .icon-box {
    background-color: var(--color-secundario);
    color: var(--color-terciario);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px auto;
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.15rem;
    color: var(--text-color);
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.75;
    line-height: 1.5;
  }
`;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export function Inicio() {
    const [destacados, setDestacados] = useState([]);
    const [loading, setLoading] = useState(true);

    // Conexión directa a Firestore para extraer los productos reales
    useEffect(() => {
        const productosCollection = collection(db, "productos nacionales");
        getDocs(productosCollection)
            .then((resp) => {
                const listaFormateada = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                // Tomamos un máximo de 5 productos de forma destacada para el carrusel
                setDestacados(listaFormateada.slice(0, 5));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar destacados de la BD:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="inicio-container">
            {/* HERO BANNER */}
            <section className={`${styles.heroBanner} d-flex align-items-center justify-content-center text-center`}>
                <div className={styles.heroOverlay}></div>
                <div className={`${styles.heroContent} position-relative text-white px-3`}>
                    <h1 className="display-4 fw-light mb-3 text-uppercase tracking-wide">Aura Derm</h1>
                    <p className="lead fs-5 mb-4 fw-light">Tu ritual diario de bienestar, cuidado facial y estética profesional</p>
                    <a href="#productos" className="btn btn-custom-accent btn-lg px-4 py-2 rounded-pill shadow-sm">
                        Explorar Productos
                    </a>
                </div>
            </section>

            {/* SECCIÓN PRODUCTOS DESTACADOS EN CARRUSEL */}
            <section id="productos" className="container my-5 py-5">
                <TituloSeccion>Aliados destacados para tu piel</TituloSeccion>
                <SubtituloSeccion>Una selección exclusiva de fórmulas diseñadas para resaltar tu belleza natural</SubtituloSeccion>

                {loading ? (
                    <p className="text-center text-muted italic">Cargando destacados desde la nube...</p>
                ) : (
                    <StyledCarousel variant="dark" interval={4000} indicators={true}>
                        {destacados.map(prod => (
                            <Carousel.Item key={prod.id}>
                                <CarouselCard>
                                    <div className="img-container">
                                        <img 
                                            src={prod.imagen || 'https://via.placeholder.com/220'} 
                                            alt={prod.nombre} 
                                            className="product-img"
                                        />
                                    </div>
                                    <div className="info-container">
                                        <div className="tag-nuevo">Destacado</div>
                                        <h3>{prod.nombre}</h3>
                                        <span className="price">${prod.precio}</span>
                                        <Link to={`/productos-nacionales/${prod.id}`} className="btn-ver">
                                            Ver Detalle <FiArrowRight />
                                        </Link>
                                    </div>
                                </CarouselCard>
                            </Carousel.Item>
                        ))}
                    </StyledCarousel>
                )}
            </section>

            {/* SECCIÓN INTERMEDIA: EXPERIENCIA Y CONFIANZA */}
            <section className="py-5" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-secundario)', borderBottom: '1px solid var(--color-secundario)' }}>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <FeatureCard>
                                <div className="icon-box"><FiTrendingUp /></div>
                                <h4>Resultados Visibles</h4>
                                <p>Fórmulas de alta concentración de activos químicos y naturales diseñados para actuar desde las primeras aplicaciones.</p>
                            </FeatureCard>
                        </Col>
                        <Col xs={12} md={4}>
                            <FeatureCard>
                                <div className="icon-box"><FiShield /></div>
                                <h4>Testeo Dermatológico</h4>
                                <p>Garantizamos el cuidado absoluto de tu salud cutánea con productos rigurosamente aprobados para pieles sensibles.</p>
                            </FeatureCard>
                        </Col>
                        <Col xs={12} md={4}>
                            <FeatureCard>
                                <div className="icon-box"><FiHeart /></div>
                                <h4>Hecho con Amor</h4>
                                <p>Creemos en el cuidado respetuoso y consciente, brindándote una experiencia sensorial única en cada ritual diario.</p>
                            </FeatureCard>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* SECCIÓN SERVICIOS */}
            <section id="servicios" className="bg-light-soft py-5 rounded-section my-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center mb-4">
                            <Servicios Mensaje="Tratamientos pensados para tu bienestar" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}