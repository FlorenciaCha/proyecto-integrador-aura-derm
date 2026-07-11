import styles from './Header.module.css';
import Nav from '../Nav/Nav'; // Importar el nuevo componente




function Header(){
    return(
        <header className={styles.headerContainer}>
             <Nav /> 
        </header>
    );
}

export default Header;