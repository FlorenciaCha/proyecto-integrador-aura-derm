import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiUsers, FiMapPin, FiLinkedin } from 'react-icons/fi';
import styled from 'styled-components';

// ==========================================
// COMPONENTES ESTILIZADOS CORPORATIVOS
// ==========================================

const BrandSection = styled.div`
  background-color: var(--color-secundario);
  border-radius: var(--border-radius-lg);
  padding: 50px 40px;
  margin-bottom: 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const BrandTitle = styled.h2`
  color: var(--color-terciario);
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const BrandText = styled.p`
  color: var(--text-color);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 20px;
  text-align: justify;
`;

const PlaceImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  border: 1px solid rgba(75, 95, 80, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  .place-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover .place-img {
    transform: scale(1.02);
  }
`;

const SectionSeparator = styled.div`
  text-align: center;
  margin-bottom: 45px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    color: var(--color-terciario);
    font-weight: 500;
    font-size: 1.8rem;
    margin-bottom: 12px;
  }

  p {
    color: var(--text-color);
    opacity: 0.8;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const StyledCard = styled(Card)`
  border: 1px solid var(--color-secundario) !important;
  border-radius: var(--border-radius-md) !important;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(75, 95, 80, 0.06);
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;

  .avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-secundario);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  }
`;

const MemberName = styled(Card.Title)`
  font-size: 1.15rem;
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: 4px;
`;

const MemberRol = styled(Card.Text)`
  font-size: 0.85rem;
  color: var(--color-terciario);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const LinkedinButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  color: var(--color-acento);
  border: 1px solid var(--color-acento);
  padding: 8px 16px;
  border-radius: var(--border-radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  margin-top: auto;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-acento);
    color: #ffffff;
  }
`;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function Nosotros({ Mensaje }) {
    const [equipo, setEquipo] = useState([]);

    useEffect(() => {
        const fetchEquipo = async () => {
            try {
                const equipoRef = collection(db, 'equipo');
                const querySnapshot = await getDocs(equipoRef);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setEquipo(data);
            } catch (error) {
                console.error('Error al traer el equipo de Firestore:', error);
            }
        };
        fetchEquipo();
    }, []);

    return (
        <Container className="pt-5 mt-4">
            {/* 1. SECCIÓN DE LA MARCA (Historia e Imagen del Espacio) */}
            <BrandSection>
                <Row className="align-items-center">
                    <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                        <BrandTitle>
                            <FiMapPin /> Nuestro Espacio
                        </BrandTitle>
                        <BrandText>
                            En <strong>Aura Derm</strong> creemos que el cuidado de la piel es mucho más que una rutina estética; es un ritual de bienestar y conexión con uno mismo. Nuestro centro está diseñado como un oasis de calma, pensado detalladamente para ofrecerte una experiencia reconfortante desde el momento en que cruzás la puerta.
                        </BrandText>
                        <BrandText>
                            Combinamos tecnología de vanguardia con activos seleccionados conscientemente para brindarle a tu piel exactamente lo que necesita, siempre bajo un enfoque personalizado y un trato sumamente cálido.
                        </BrandText>
                    </Col>
                    <Col xs={12} lg={6}>
                        <PlaceImageWrapper>
                            <img 
                                src="/imagenes/aura-derm.png" // Asegurate de que esta imagen exista en tu carpeta public/imagenes/
                                alt="Instalaciones de Aura Derm" 
                                className="place-img" 
                            />
                        </PlaceImageWrapper>
                    </Col>
                </Row>
            </BrandSection>

            {/* 2. SEPARATOR E INTRODUCCIÓN AL STAFF */}
            <SectionSeparator>
                <h2>Conocé a Nuestro Equipo</h2>
                <p>
                    Detrás de cada tratamiento hay un grupo de profesionales apasionados, comprometidos con la salud de tu piel y tu bienestar integral.
                </p>
            </SectionSeparator>

            {/* 3. GRILLA DEL EQUIPO DESDE FIRESTORE */}
            <Row className="justify-content-center">
                {equipo.map(miembro => (
                    <Col key={miembro.id} xs={12} sm={6} lg={3} className="mb-4">
                        <StyledCard>
                            <AvatarWrapper>
                                <img 
                                    src={miembro.fotoURL || 'https://via.placeholder.com/150'} 
                                    alt={`Foto de ${miembro.nombre}`} 
                                    className="avatar-img" 
                                />
                            </AvatarWrapper>
                            <Card.Body className="d-flex flex-column text-center p-4">
                                <MemberName>{miembro.nombre}</MemberName>
                                <MemberRol>{miembro.rol || 'Especialista'}</MemberRol>
                                
                                {miembro.linkedinURL && (
                                    <LinkedinButton 
                                        href={miembro.linkedinURL} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <FiLinkedin /> LinkedIn
                                    </LinkedinButton>
                                )}
                            </Card.Body>
                        </StyledCard>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Nosotros;