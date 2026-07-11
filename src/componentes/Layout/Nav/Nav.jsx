import React, { useState } from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext.jsx';  
import { useAuth } from '../../../context/AuthContext.jsx';
import { FiMenu, FiX } from 'react-icons/fi'; // Importamos iconos limpios para la hamburguesa

function Nav() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity(); 
  const { user, logout } = useAuth();
  
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className={styles.navContainer}>
      {/* LOGO */}
      <Link to="/" className={styles.logoLink} onClick={cerrarMenu}>
        <img 
          src="/imagenes/logo-aura-derm.png" 
          alt="Aura Derm Logo" 
          className={styles.logoImage} 
        />
      </Link>

      {/* BOTÓN HAMBURGUESA (Solo visible en móviles/tablets) */}
      <button 
        className={styles.hamburgerButton} 
        onClick={toggleMenu}
        aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
      >
        {menuAbierto ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>

      {/* CONTENEDOR COLAPSABLE (Enlaces + Autenticación) */}
      <div className={`${styles.menuCollapse} ${menuAbierto ? styles.menuOpen : ''}`}>
        
        {/* Enlaces de navegación */}
        <div className={styles.navLinksWrapper}>
          <Link to="/" className={styles.navLink} onClick={cerrarMenu}>Inicio</Link>
          <Link to='/productos-nacionales' className={styles.navLink} onClick={cerrarMenu}>Productos</Link>
          <Link to="/servicios" className={styles.navLink} onClick={cerrarMenu}>Servicios</Link>
          <Link to="/contacto" className={styles.navLink} onClick={cerrarMenu}>Nosotros</Link>
          
          {user?.rol === "admin" && (
            <Link to="/gestion" className={styles.navLink} onClick={cerrarMenu}>Gestión Productos</Link>
          )}
          
          {user && (
            <Link to='/carrito' className={styles.navLink} onClick={cerrarMenu}>
              Carrito {totalItems > 0 && <span className="badge bg-light text-dark ms-1 rounded-pill">{totalItems}</span>}
            </Link>
          )}
        
          {user && (
            <Link to="/perfil" className={styles.navLink} onClick={cerrarMenu}>Mi Perfil</Link>
          )}
          
          {user && (
            <Link to='/admin/cupones' className={styles.navLink} onClick={cerrarMenu}>Mis Cupones</Link>
          )}
        </div>

        {/* SECCIÓN DE AUTENTICACIÓN */}
        <div className={styles.authWrapper}>
          {user ? (
            <div className={styles.userInfoMobile}>
              <span className={styles.userEmail}>Hola, {user.email.split('@')[0]}</span>
              <button 
                onClick={() => { logout(); cerrarMenu(); }} 
                className="btn btn-outline-light btn-sm rounded-pill px-3 py-1"
                style={{ color: 'var(--color-terciario)', borderColor: 'var(--color-terciario)' }}
              >
                Salir
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.btnNavLogin} onClick={cerrarMenu}>Acceso</Link>
              <Link to="/registro" className={styles.btnNavRegister} onClick={cerrarMenu}>Registro</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Nav;