import {ItemList} from "../ItemList/ItemList";
import React, { useState, useEffect } from 'react';

export function ItemListContainer({Mensaje}) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json') 
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar el catálogo de productos');
                }
                return respuesta.json();
            })
            .then(datos => {
                setProductos(datos);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false); 
            });
    }, []);

    
    if (cargando) {
        return <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos destacados...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'var(--color-terciario)', margin: '2rem 0' }}>{Mensaje}</h2>
            <div>
                <img style={{ display: 'none' }} src="" alt="" /> 
                <ItemList productos={productos} />
            </div>
        </div>
    );
}