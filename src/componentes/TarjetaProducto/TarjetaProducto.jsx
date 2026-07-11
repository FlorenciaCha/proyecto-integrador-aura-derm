import { useState } from 'react';
import styles from './TarjetaProducto.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export function TarjetaProducto({ id, nombre, precio, stock, imagen }) {
  // Crear el objeto producto a partir de las props
  const producto = { id, nombre, precio, stock, imagen };

  // 1. TRAER LAS FUNCIONES DEL CONTEXTO PRIMERO (Corregido)
  const { addToCart, getCantidadActual } = useCart(); // Traemos ambas funciones juntas

  // 2. LEER LA CANTIDAD ACTUAL (Corregido: ahora la función ya existe en este punto)
  const cantidadActual = getCantidadActual(producto.id); 

  // Estados locales independientes
  const [cantidad, setCantidad] = useState(1); // Tip: Conviene iniciar en 1 para no agregar 0 cosas.
  const [esFavorito, setEsFavorito] = useState(false);

  const marcarComoFavorito = () => setEsFavorito(!esFavorito);

  const incrementar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  // LOGICA DEL CARRITO
  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito`);
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
        {/* Cambiado: Mostramos el estado local 'cantidad' que manejan tus botones + y - */}
        <span>{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>

      <button className={styles.button} onClick={handleAddToCart}>
        Agregar {cantidad} al Carrito
      </button>

      {/* Opcional: Si querés mostrarle al usuario cuántos ya tiene guardados en el carrito en total */}
      {cantidadActual > 0 && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          Ya tenés {cantidadActual} en el carrito
        </p>
      )}
    </div>
  );
}