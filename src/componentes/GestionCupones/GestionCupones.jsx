import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config'; 
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import styled from 'styled-components';
import { FiTag, FiTrash2, FiPercent } from 'react-icons/fi';

// ==========================================
// COMPONENTES ESTILIZADOS CORPORATIVOS
// ==========================================

const AdminLayout = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: sans-serif;

  h2, h3 {
    color: var(--color-terciario);
    font-weight: 500;
    text-align: center;
    margin-bottom: 25px;
  }
`;

const FormSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  width: 100%;
`;

const FormularioEstilizado = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-lg); /* Marco grande idéntico al de bienvenida */
  padding: 35px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  label {
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 6px;
    font-size: 0.95rem;
    display: block;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 18px;
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-lg); /* Inputs ultra redondeados como el login */
  background-color: #ffffff;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus {
    border-color: var(--color-terciario);
    box-shadow: 0 0 0 3px rgba(75, 95, 80, 0.1);
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

const BotonSubmit = styled.button`
  background-color: var(--color-terciario); /* Color verde oscuro como botón Ingresar */
  color: #ffffff;
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--border-radius-lg); /* Redondeado grande */
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(75, 95, 80, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background-color: #3d4f42;
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(75, 95, 80, 0.2);
  }

  &:active {
    transform: scale(0.99);
  }
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid var(--color-secundario);
  margin: 40px 0;
`;

const CuponesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const HorizontalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-md); /* Card de lista redondeado medio */
  padding: 14px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }
`;

const CuponInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-color);

  .icon-tag {
    color: var(--color-acento);
  }

  strong {
    letter-spacing: 1px;
    font-size: 1.05rem;
    color: var(--text-color);
  }

  span {
    color: #666;
    font-size: 0.95rem;
  }
`;

const BotonEliminar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: transparent;
  border: 1px solid #e5989b; /* Rojo coral pastel suave */
  color: #b56576;
  padding: 8px 16px;
  border-radius: var(--border-radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff5f5;
    color: #b56576;
  }

  &:active {
    transform: scale(0.97);
  }
`;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const GestionCupones = () => {
    const [cupones, setCupones] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [descuento, setDescuento] = useState('');

    const fetchCupones = async () => {
        try {
            const cuponesRef = collection(db, 'cupones');
            const resp = await getDocs(cuponesRef);
            setCupones(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error al traer los cupones:", error);
        }
    };

    useEffect(() => {
        fetchCupones();
    }, []);

    const handleCrearCupon = async (evento) => {
        evento.preventDefault();

        if (!codigo.trim() || !descuento) {
            alert("Por favor, completá todos los campos.");
            return;
        }

        const nuevoCupon = {
            codigo: codigo.toUpperCase().trim(), 
            descuento: Number(descuento)          
        };

        try {
            const cuponesRef = collection(db, 'cupones');
            await addDoc(cuponesRef, nuevoCupon);
            alert("¡Cupón añadido con éxito!");
            setCodigo('');
            setDescuento('');
            fetchCupones();
        } catch (error) {
            console.error("Error al crear el cupón:", error);
            alert("Hubo un error al guardar el cupón.");
        }
    };

    const handleEliminarCupon = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este cupón?");
        if (confirmacion) {
            try {
                const docRef = doc(db, 'cupones', id);
                await deleteDoc(docRef);
                setCupones(cupones.filter((cupon) => cupon.id !== id));
                alert("Cupón eliminado.");
            } catch (error) {
                console.error("Error al eliminar el cupón:", error);
                alert("No se pudo eliminar el cupón.");
            }
        }
    };

    return (
        <AdminLayout>
            <h2>Panel de Gestión de Cupones</h2>
            
            {/* Formulario de Creación con estructura de bienvenida */}
            <FormSectionWrapper>
                <FormularioEstilizado onSubmit={handleCrearCupon}>
                    <h3>Añadir Nuevo Cupón</h3>
                    
                    <InputGroup>
                        <label>Código del Cupón:</label>
                        <StyledInput 
                            type="text" 
                            value={codigo} 
                            onChange={(e) => setCodigo(e.target.value)} 
                            placeholder="Ej: AURA10"
                        />
                    </InputGroup>
                    
                    <InputGroup>
                        <label>Porcentaje de Descuento (%):</label>
                        <StyledInput 
                            type="number" 
                            value={descuento} 
                            onChange={(e) => setDescuento(e.target.value)} 
                            placeholder="Ej: 15"
                            min="1"
                            max="100"
                        />
                    </InputGroup>
                    
                    <BotonSubmit type="submit">
                        Crear Cupón
                    </BotonSubmit>
                </FormularioEstilizado>
            </FormSectionWrapper>

            <Separator />

            {/* Listado de Visualización Horizontal */}
            <h3>Cupones Activos</h3>
            <CuponesContainer>
                {cupones.length === 0 ? (
                    <p className="text-center text-muted italic">No hay cupones de descuento vigentes.</p>
                ) : (
                    cupones.map((cupon) => (
                        <HorizontalCard key={cupon.id}>
                            <CuponInfo>
                                <FiTag className="icon-tag" size={18} />
                                <strong>{cupones.codigo}</strong> {/* Corregido de cupon.codigo a tu estado o propiedad */}
                                <strong>{cupon.codigo}</strong>
                                <span>&bull; Descuento: {cupon.descuento}%</span>
                            </CuponInfo>
                            
                            <BotonEliminar onClick={() => handleEliminarCupon(cupon.id)}>
                                <FiTrash2 size={14} /> Eliminar
                            </BotonEliminar>
                        </HorizontalCard>
                    ))
                )}
            </CuponesContainer>
        </AdminLayout>
    );
};

export default GestionCupones;