import styles from './Nav.module.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navLink}>
        Inicio
      </Link>
      <Link to="/productos" className={styles.navLink}>
        Productos
      </Link>
      <Link to="/servicios" className={styles.navLink}>
        Servicios
      </Link>
      <Link to="/contacto" className={styles.navLink}>
        Contacto
      </Link>
      <Link to="/alta" className={styles.navLink}>
        Alta de Producto
      </Link>
    </nav>
  );
}

export default Nav;