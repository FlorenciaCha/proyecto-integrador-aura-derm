import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';


const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error('Error al cargar el producto:', error));
    }, [id]);

    if(!producto){
        return <h2>Cargando detalle del producto...</h2>;
    }

    if(!producto.id){
        return <h2>Producto no encontrado</h2>;
    }

    return(
        <div>
            <h2>Detalle del Producto</h2>
            <img src={producto.imagen} alt={producto.nombre} style ={{ maxWidth: '400px'}}/>
            <h3>${producto.precio}</h3>
            <p>{producto.descripcion}</p>

            {/* Lógica de Favoritos con Operador Ternario */}
            <span onClick={marcarComoFavorito} style={{ cursor: 'pointer', fontSize: '24px' }}>
                {esFavorito ? '⭐' : '☆'} 
            </span>

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
};

export default ProductoDetalle;