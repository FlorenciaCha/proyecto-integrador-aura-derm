import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getDocs, collection } from 'firebase/firestore'; 
import { db } from '../../firebase/config.jsx'; 
import styled from 'styled-components';


const TituloSeccion = styled.h1`
  color: var(--color-terciario);
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.2rem;
`;

const TarjetaServicio = styled(Card)`
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-md);
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  overflow: hidden;
  height: 100%;
  text-decoration: none;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(75, 95, 80, 0.08);
  }

  /* Estilo para envolver la imagen del servicio */
  .img-wrapper {
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 15px;
  }

  .servicio-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: transform 0.4s ease;
  }

  &:hover .servicio-img {
    transform: scale(1.03);
  }
`;

const EnlaceContenedor = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    color: inherit;
  }
`;

const NombreServicio = styled(Card.Title)`
  font-size: 1.15rem;
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const PrecioServicio = styled(Card.Text)`
  font-weight: 600;
  color: var(--color-acento);
  font-size: 1.15rem;
  margin-top: auto; /* Empuja el precio al fondo de la tarjeta */
`;


function Servicios({ Mensaje }) {
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        try{
            const serviciosDB = collection(db, "servicios");
            getDocs(serviciosDB)
                .then((resp) => {
                    const listaServicios = resp.docs.map((doc) => {
                        return {...doc.data(), id: doc.id};
                    });
                    setServicios(listaServicios);
                })
                .catch((err) => {
                    console.error("Error Firebase", err);
                    setError("Hubo un problema al leer los datos de Firebase");
                });
        }
        catch (err){
            console.error("Error crítico:", err);
            setError("Error de configuración inicial");
        }
    }, []);

    if (error) {
        return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}><h2>⚠️ {error}</h2></div>;
    }

    return (
        <Container className="pt-5 mt-4">
            <TituloSeccion>{Mensaje || "Nuestros Servicios"}</TituloSeccion>
            
            {/* Sistema de Grillas Responsivo de Bootstrap */}
            <Row>
                {servicios.map(servicio => (
                    <Col key={servicio.id} xs={12} sm={6} lg={4} className="mb-4">
                        <TarjetaServicio>
                            <EnlaceContenedor to={`/servicios/${servicio.id}`}>
                                {/* Contenedor de Imagen Estético */}
                                <div className="img-wrapper">
                                    <img 
                                        src={servicio.imagen || 'https://via.placeholder.com/200'} 
                                        alt={servicio.nombre} 
                                        className="servicio-img"
                                    />
                                </div>
                                
                                <Card.Body className="d-flex flex-column text-center p-4">
                                    <NombreServicio>{servicio.nombre}</NombreServicio>
                                    <PrecioServicio>${servicio.precio}</PrecioServicio>
                                </Card.Body>
                            </EnlaceContenedor>
                        </TarjetaServicio>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Servicios;