import { useState } from 'react';
import styles from './TarjetaProducto.module.css';

export function TarjetaProducto({ nombre, precio, stock, imagen }) {
  // Estados locales independientes
  const [esFavorito, setEsFavorito] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const marcarComoFavorito = () => setEsFavorito(!esFavorito);

  const incrementar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imagen} alt={nombre} className={styles.image} />
      </div>
      
      {/* Lógica de Favoritos con Operador Ternario */}
      <span onClick={marcarComoFavorito} style={{ cursor: 'pointer', fontSize: '24px' }}>
        {esFavorito ? '⭐' : '☆'} 
      </span>

      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p>Stock: {stock}</p>

      {/* Selector de cantidad */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <button onClick={decrementar}>-</button>
        <span>{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>

      <button className={styles.button} onClick={() => alert(`Agregaste ${cantidad} ${nombre} al carrito`)}>
        Agregar al Carrito
      </button>
    </div>
  );
}