import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './Servicios.module.css';

function Servicios({ Mensaje }) {
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/servicios.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los servicios');
                }
                return respuesta.json();
            })
            .then(datos => {
                setServicios(datos);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando Servicios...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.contenedorServicios}>
            <h1 className={styles.tituloSeccion}>{Mensaje}</h1>
            <ul className={styles.listaServicios}>
                {servicios.map(servicio => (
                    <li key={servicio.id} className={styles.itemServicio}>
                        <Link to={`/servicios/${servicio.id}`}>
                            <h2 className={styles.nombreServicio}>{servicio.nombre}</h2>
                            <img src={servicio.imagen} alt={servicio.nombre} width="150" height="150"/>
                            <p className={styles.precioServicio}>Precio: ${servicio.precio}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Servicios;