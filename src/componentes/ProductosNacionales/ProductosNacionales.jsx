import React, { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, startAfter } from 'firebase/firestore'; // Importamos utilidades de paginación
import { db } from '../../firebase/config.jsx'; 
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Button, Alert } from 'react-bootstrap'; // Agregamos Spinner, Button y Alert
import { Helmet } from 'react-helmet'; 
import { FiSearch, FiPlus } from 'react-icons/fi'; 
import { useCart } from '../../context/CartContext.jsx'; 
import { useAuth } from '../../context/AuthContext.jsx'; 
import styled from 'styled-components'; 

// ==========================================
// COMPONENTES ESTILIZADOS
// ==========================================

const TituloSeccion = styled.h1`
  color: var(--color-terciario);
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  
  .search-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: var(--text-color);
    opacity: 0.6;
    font-size: 1.2rem;
  }
`;

const StyledInput = styled.input`
  padding-left: 45px !important; 
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-secundario);
  color: var(--text-color);
  background-color: var(--background-color);
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: var(--color-terciario);
    box-shadow: 0 0 0 0.2rem rgba(75, 95, 80, 0.25);
  }
`;

const StyledCard = styled(Card)`
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-md);
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .card-img-top {
    height: 200px;
    object-fit: contain;
    padding: 15px;
    background-color: #ffffff;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  width: 100%;
`;

const ButtonPrimary = styled(Link)`
  flex: 1;
  background-color: var(--color-primario);
  color: var(--text-color);
  border: none;
  padding: 10px 15px;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-terciario);
    color: #ffffff;
  }
`;

const ButtonAddCart = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-secundario);
  color: var(--color-terciario);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-acento);
    color: #ffffff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const PRODUCTOS_POR_PAGINA = 6; // Definimos el límite de carga por página

const ProductosNacionales = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Estados de paginación y carga sugeridos por la Clase 14
    const [cargando, setCargando] = useState(true);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [ultimoVisible, setUltimoVisible] = useState(null);
    const [hayMas, setHayMas] = useState(true);
    
    const { addToCart } = useCart();
    const { user } = useAuth(); 

    // Filtrado local sobre los productos que ya están cargados en pantalla
    const productosFiltrados = productos.filter(prod => 
        prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función 1: Obtener productos iniciales (Límite controlado de Firestore)
    const obtenerProductosIniciales = () => {
        setCargando(true);
        const productosDB = collection(db, "productos nacionales");
        const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));

        getDocs(q)
            .then((resp) => {
                const productosData = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setProductos(productosData);
                
                // Guardamos la referencia para el paginador
                const ultimoDoc = resp.docs[resp.docs.length - 1];
                setUltimoVisible(ultimoDoc);
                setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
            })
            .catch((err) => {
                console.error("Error Firebase:", err);
                setError("Hubo un problema al leer los datos de Firebase.");
            })
            .finally(() => setCargando(false));
    };

    // Función 2: Cargar siguiente página (startAfter)
    const obtenerMasProductos = () => {
        if (!hayMas || cargandoMas) return;
        setCargandoMas(true);

        const productosDB = collection(db, "productos nacionales");
        const q = query(productosDB, startAfter(ultimoVisible), limit(PRODUCTOS_POR_PAGINA));

        getDocs(q)
            .then((resp) => {
                const productosData = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                
                // Anexamos los nuevos productos a los anteriores
                setProductos((anteriores) => [...anteriores, ...productosData]);
                
                const ultimoDoc = resp.docs[resp.docs.length - 1];
                setUltimoVisible(ultimoDoc);
                setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
            })
            .catch((err) => {
                console.error("Error al cargar más productos:", err);
            })
            .finally(() => setCargandoMas(false));
    };

    // Función 3: Resetear paginado ("Ver menos")
    const verMenos = () => {
        obtenerProductosIniciales();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        obtenerProductosIniciales();
    }, []); 

    const handleQuickAdd = (prod) => {
        if (!user) {
            alert("⚠️ Debes iniciar sesión para poder guardar productos en el carrito.");
            return; 
        }
        addToCart(prod, 1);
        alert(`¡Se agregó 1 unidad de ${prod.nombre} al carrito! 🛒`);
    };

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}><h2>⚠️ {error}</h2></div>;
    }

    return (
        <Container className="pt-5 mt-2"> 
            <Helmet>
                <title>Aura Derm | Productos Nacionales</title>
                <meta name="description" content="Explora nuestro catálogo de productos nacionales para el cuidado de tu piel. Envíos a todo el país." />
            </Helmet>

            <TituloSeccion>Todo para mimar tu piel</TituloSeccion>
            
            {/* Buscador */}
            <Row className="mt-4 mb-5 justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <SearchContainer>
                        <FiSearch className="search-icon" />
                        <StyledInput
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Buscar productos por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchContainer>
                </Col>
            </Row>

            {/* Spinner de Carga Inicial */}
            {cargando ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
                    <Spinner animation="border" variant="success" role="status">
                        <span className="visually-hidden">Cargando productos...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {/* Grilla de productos */}
                    <Row> 
                        {productosFiltrados.length === 0 ? (
                            <Col xs={12}>
                                <p className="text-center text-muted">No se encontraron productos que coincidan con la búsqueda.</p>
                            </Col>
                        ) : (
                            productosFiltrados.map(prod => ( 
                                <Col key={prod.id} xs={12} sm={6} lg={4} className="mb-4"> 
                                    <StyledCard className="h-100"> 
                                        <Card.Img variant="top" src={prod.imagen || 'https://via.placeholder.com/200'} alt={prod.nombre} /> 
                                        <Card.Body className="d-flex flex-column"> 
                                            <Card.Title className="fs-5 text-dark mb-2">{prod.nombre}</Card.Title> 
                                            <Card.Text className="fw-bold mb-3" style={{ color: 'var(--color-acento)', fontSize: '1.2rem' }}>
                                                ${prod.precio}
                                            </Card.Text> 
                                            
                                            <CardActions>
                                                <ButtonPrimary to={`/productos-nacionales/${prod.id}`}> 
                                                    Ver detalle 
                                                </ButtonPrimary> 
                                                
                                                {/* Botón con etiqueta de accesibilidad ARIA */}
                                                <ButtonAddCart 
                                                    onClick={() => handleQuickAdd(prod)} 
                                                    title="Agregar al carrito"
                                                    aria-label={`Agregar ${prod.nombre} al carrito`}
                                                >
                                                    <FiPlus size={20} />
                                                </ButtonAddCart>
                                            </CardActions>
                                        </Card.Body> 
                                    </StyledCard> 
                                </Col> 
                            ))
                        )} 
                    </Row> 

                    {/* Botones de Control del Paginador (Ver más / Ver menos) */}
                    {!searchTerm && (
                        <Row className="mt-4 mb-5">
                            <Col className="text-center d-flex justify-content-center gap-3">
                                {productos.length > PRODUCTOS_POR_PAGINA && (
                                    <Button variant="outline-secondary" onClick={verMenos}>
                                        Ver menos
                                    </Button>
                                )}
                                
                                {hayMas ? (
                                    <Button 
                                        variant="success" 
                                        onClick={obtenerMasProductos} 
                                        disabled={cargandoMas}
                                        style={{ backgroundColor: 'var(--color-terciario)', borderColor: 'var(--color-terciario)' }}
                                    >
                                        {cargandoMas ? (
                                            <>
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                Cargando...
                                            </>
                                        ) : 'Cargar más'}
                                    </Button>
                                ) : (
                                    productos.length > PRODUCTOS_POR_PAGINA && (
                                        <Alert variant="light" className="m-0 border-0 text-muted">
                                            No hay más productos para mostrar.
                                        </Alert>
                                    )
                                )}
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </Container> 
    );
};

export default ProductosNacionales;