import React, {useState, useEffect} from 'react';
import styles from './Nosotros.module.css';
function Nosotros({ Mensaje }) {
    const [miembros, setMiembros] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/nosotros.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los miembros');
                }
                return respuesta.json();
            })
            .then(datos => {
                setMiembros(datos);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando miembros...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.contenedorNosotros}>
            <h1 className={styles.grillaMiembros}>{Mensaje}</h1>
            <ul className={styles.grillaMiembros}>
                {miembros.map(miembro => (
                <li key={miembro.id} className={styles.tarjeta}>
                    <img src={miembro.imagen} alt={miembro.nombre} className={styles.fotoMiembro} />
                    <h3 className={styles.nombre}>{miembro.nombre}</h3>
                    <p className={styles.puesto}>Puesto: {miembro.puesto}</p>
                    <p className={styles.email}>{miembro.email}</p>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default Nosotros;