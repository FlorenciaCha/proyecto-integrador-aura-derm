import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from '../FormularioContainer/FormularioContainer';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa';



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
    margin-bottom: 20px;
  }
`;

const FormSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  width: 100%;
  padding: 0 20px; /* Evita que toque los bordes en móviles */
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid var(--color-secundario);
  margin: 40px 0;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

// Card Horizontal
const HorizontalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid var(--color-secundario);
  border-radius: var(--border-radius-md); /* Bordes redondeados estéticos sugeridos */
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .prod-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 6px;
    background-color: #fafafa;
  }

  .prod-details {
    display: flex;
    flex-direction: column;
    
    .prod-name {
      font-weight: 500;
      color: var(--text-color);
      font-size: 1.05rem;
    }

    .prod-price {
      color: var(--color-acento);
      font-weight: 600;
      margin-top: 2px;
    }
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const BotonAccion = styled.button` 
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: transparent; 
  border: 1px solid var(--color-secundario); 
  border-radius: var(--border-radius-md); 
  padding: 8px 16px; 
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer; 
  transition: all 0.2s ease; 
`; 

const BotonEditar = styled(BotonAccion)` 
  border-color: var(--color-acento); 
  color: var(--color-acento); 

  &:hover { 
    background-color: var(--color-acento); 
    color: white; 
  } 
`; 


const BotonEliminar = styled(BotonAccion)` 
  border-color: #e5989b; /* Tono coral pastel suave de base */
  color: #b56576; 

  &:hover { 
    background-color: #e5989b; 
    color: white; 
    border-color: #e5989b;
  } 
`; 


// COMPONENTE PRINCIPAL


const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null); 
    
    const cargarProductos = async () => {
        const productosRef = collection(db, 'productos nacionales');
        const resp = await getDocs(productosRef);
        setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        cargarProductos();
    }, []); 

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
            try {
                const docRef = doc(db, 'productos nacionales', id);
                await deleteDoc(docRef);
                setProductos(productos.filter((prod) => prod.id !== id));
                alert("Producto eliminado con éxito");
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Hubo un error al intentar eliminar el producto.");
            }
        }
    };

    const handleEditClick = (producto) => {
        setProductoAEditar(producto);
    };
    
    return (
        <AdminLayout>
            <h2>Gestión de Productos</h2>
            
            {/* Contenedor del formulario unificado estéticamente con el Login */}
            <FormSectionWrapper>
                <FormularioContainer 
                    productoAEditar={productoAEditar} 
                    setProductoAEditar={setProductoAEditar}
                    recargarLista={cargarProductos} 
                />
            </FormSectionWrapper>
            
            <Separator />
            
            <h3>Lista de Productos</h3>
            <ProductListContainer>
                {productos.map((prod) => (
                    <HorizontalCard key={prod.id}>
                        {/* Información e imagen a la izquierda */}
                        <ProductInfo>
                            <img 
                                src={prod.imagen || 'https://via.placeholder.com/50'} 
                                alt={prod.nombre} 
                                className="prod-img" 
                            />
                            <div className="prod-details">
                                <span className="prod-name">{prod.nombre}</span>
                                <span className="prod-price">${prod.precio}</span>
                            </div>
                        </ProductInfo>

                        {/* Botones de acción encapsulados a la derecha */}
                        <ActionsWrapper>
                            <BotonEditar onClick={() => handleEditClick(prod)}> 
                                <FaEdit size={14} /> Editar
                            </BotonEditar> 

                            <BotonEliminar onClick={() => handleDelete(prod.id)}> 
                                <FaTrash size={12} /> Eliminar
                            </BotonEliminar>
                        </ActionsWrapper>
                    </HorizontalCard>
                ))}
            </ProductListContainer>
        </AdminLayout>
    );
};

export default Gestion;