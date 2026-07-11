import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProductos({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, cargando, modoEdicion}) {
   
    return(
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            {/* 2. Contenido Dinámico: Título condicional según el modo */}
            <h3>{modoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
            <div className={styles.campo}>
                <label>ID del producto:</label>
                <input 
                    type="text" 
                    placeholder="Ej: IF456" 
                    name="id"
                    value={datosForm.id}
                    onChange={manejarCambio}
                    className={styles.inputControl}
                />
            </div>
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
                <label>Descripción del producto:</label>
                <input 
                    type="text" 
                    placeholder="Ingrese la descripción del producto" 
                    name="descripcion"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                    className={styles.inputControl}
                />
            </div>
            <div className={styles.campo}>
                <label>Categoría:</label>
                <input 
                    type="text" 
                    placeholder="Ej: Skincare" 
                    name="categoria"
                    value={datosForm.categoria}
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
                    name="imagen"
                    onChange={manejarCambioImagen}
                    className={styles.inputFile}
                />
                
                {/* 3. Mostrar Imagen Actual: Renderizado condicional si estamos editando */}
                {modoEdicion && datosForm.imagen && (
                    <div className={styles.previewContainer} style={{ marginTop: '10px', textAlign: 'left' }}>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>Imagen actual:</p>
                        <img 
                            src={datosForm.imagen} 
                            alt="Vista previa actual" 
                            style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '4px', objectFit: 'contain', border: '1px solid #eae6df' }} 
                        />
                    </div>
                )}
            </div>
            {/* 2. Contenido Dinámico: Texto del botón condicional basándose en modoEdicion y cargando */}
            <button type="submit" disabled={cargando} className={styles.botonSubmit}>
                {cargando ? 'Guardando...' : (modoEdicion ? 'Actualizar Producto' : 'Guardar Producto')}
            </button>

            
        </form>
    );
}