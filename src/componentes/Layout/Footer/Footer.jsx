import styles from './Footer.module.css';

function Footer(){
    return(
        <footer className={styles.footerContainer}>
            <p>&copy; 2026 - Aura Derm. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;