import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import styles from './Productos.module.css';

function Productos({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
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
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.contenedorProductos}>
            <h1 className={styles.tituloSeccion}>{Mensaje}</h1>
            <ul className={styles.listaProductos}>
                {productos.map(producto => (
                    <li key={producto.id} className={styles.itemProducto}>
                        <Link to={`/productos/${producto.id}`}>
                            <h2 className={styles.nombreProducto}>{producto.nombre}</h2>
                            <img src={producto.imagen} alt={producto.nombre} width="150" height="150"/>
                            <p className={styles.nombreProducto}>Precio: ${producto.precio}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Productos;