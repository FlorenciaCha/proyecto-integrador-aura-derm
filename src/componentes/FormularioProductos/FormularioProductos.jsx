import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProductos({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, cargando}) {
   
    return(
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <h3>Agregar Nuevo Porducto</h3>
            <div className={styles.campo}>
                <label>Nombre del producto:</label>
                <input 
                    type="text" 
                    placeholder="Ej: Crema Hidratante" 
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    className={styles.inputControl}
                />
            </div>
            <div className={styles.campo}>
                <label>Precio: $</label>
                <input 
                    type="number" 
                    placeholder="Ej: 19000" 
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                    className={styles.inputControl}
                />
            </div>
            <div className={styles.campo}>
                <label>Stock:</label>
                <input 
                    type="number" 
                    placeholder="Ej: 50" 
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    className={styles.inputControl}
                />
            </div>
            <div className={styles.campo}>
                <label>Imagen:</label>
                <input 
                    type="file" 
                    placeholder="http://..." 
                    name="imagen"
                    onChange={manejarCambioImagen}
                    className={styles.inputFile}
                />
            </div>
            <button type="submit" disabled={cargando} className={styles.botonSubmit}>
                {cargando ? 'Guardando...' : 'Guardar Producto'}
            </button>
        </form>
    );
}