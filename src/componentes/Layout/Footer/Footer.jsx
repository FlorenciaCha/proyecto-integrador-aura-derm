import styles from './Footer.module.css';
import {useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../firebase/config';


function Footer(){
    const [equipo, setEquipo] = useState([]);

    useEffect(() => {
        const fetchEquipo = async () => {
            try{
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

    return(
        <footer className={styles.footerContainer}>
            {equipo.length > 0 && (
                <div className = {styles.teamGrid}>
                    {equipo.map((integrante) => (
                        <div key={integrante.id} className={styles.memberCard}>
                            <img 
                                src={integrante.fotoURL || 'https://via.placeholder.com/150'} 
                                alt={`Foto de ${integrante.nombre}`} 
                                className={styles.avatar} 
                            />
                            <div className={styles.memberInfo}>
                                <h4 className={styles.memberName}>{integrante.nombre}</h4>
                                <p className={styles.memberRol}>{integrante.rol}</p>
                                <a 
                                    href={integrante.linkedinURL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.linkedinLink}
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <p>&copy; 2026 - Aura Derm. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;