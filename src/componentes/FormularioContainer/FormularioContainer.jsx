import React, { useState, useEffect } from 'react';
import { FormularioProductos } from '../FormularioProductos/FormularioProductos';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';



const ContainerCentrador = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const BotonCancelar = styled.button`
  background-color: #ffffff;
  color: #b56576; 
  border: 1px solid #e5989b;
  padding: 10px 24px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  margin-bottom: 5px; /* Margen óptimo para que se acople al diseño modular superior */
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  &:hover {
    background-color: #fff5f5;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(229, 152, 155, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;



export function FormularioContainer({ productoAEditar, setProductoAEditar, recargarLista }) {
    const [datosForm, setDatosForm] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
    });

    const [imagenFile, setImagenFile] = useState(null);
    const [cargando, setCargando] = useState(false); 

    // Sincronización del formulario y el estado de edición pasados por Prop
    useEffect(() => {
        if (productoAEditar) {
            setDatosForm({
                id: productoAEditar.id || '', 
                nombre: productoAEditar.nombre || '',
                descripcion: productoAEditar.descripcion || '',
                precio: productoAEditar.precio || '',
                stock: productoAEditar.stock || '',
                categoria: productoAEditar.categoria || '',
                imagen: productoAEditar.imagen || ''
            });
        } else {
            setDatosForm({ id: '', nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
        }
    }, [productoAEditar]);

    const manejarCambio = (evento) => { 
        const { name, value } = evento.target; 
        setDatosForm({ 
            ...datosForm, 
            [name]: value 
        }); 
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        // VALIDACIÓN MANUAL ANTES DE ENVIAR
        if (datosForm.nombre.trim() === "" || Number(datosForm.precio) <= 0) {
            alert("Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.");
            return; 
        }

        if (!imagenFile && !productoAEditar) {
            alert('Por favor, selecciona una imagen para el producto');
            return; 
        }

        setCargando(true);
        let urlImagen = datosForm.imagen || ''; 

        try {
            if (imagenFile) {
                const apiKey = '04863fd9221128c97fbaffb9ddb824b8';
                const formData = new FormData();
                formData.append('image', imagenFile);

                console.log("Subiendo imagen a Imgbb...");
                const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const datosImgbb = await respuesta.json();

                if (!datosImgbb.success) {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }
                urlImagen = datosImgbb.data.url;
                console.log("Imagen subida exitosamente. URL:", urlImagen);
            }

            const productoFinal = {
                ...datosForm,
                precio: Number(datosForm.precio), 
                stock: Number(datosForm.stock),   
                imagen: urlImagen      
            };

            const db = getFirestore();

            if (productoAEditar) {
                console.log('Actualizando documento en Firestore...');
                const docRef = doc(db, 'productos nacionales', productoAEditar.id);
                await updateDoc(docRef, productoFinal);
                alert('¡Producto actualizado con éxito!');
                setProductoAEditar(null); 
            } else {
                console.log('Creando nuevo documento en Firestore...');
                const productosCollection = collection(db, 'productos nacionales');
                await addDoc(productosCollection, productoFinal);
                alert('¡Producto creado exitosamente!');
            }
            
            setDatosForm({ id: '', nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
            setImagenFile(null);
            recargarLista();

        } catch (error) {
            console.error('Error en el proceso de envío:', error);
            alert('Hubo un error en el proceso de envío. Por favor, intenta nuevamente.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <ContainerCentrador>
            {productoAEditar && (
                <BotonCancelar onClick={() => setProductoAEditar(null)}>
                    Cancelar Edición
                </BotonCancelar>
            )}

            <FormularioProductos 
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                manejarCambioImagen={manejarCambioImagen}
                cargando={cargando}
                modoEdicion={!!productoAEditar} 
            />
        </ContainerCentrador>
    );
}