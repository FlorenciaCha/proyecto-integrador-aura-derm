import {TarjetaProducto} from '../TarjetaProducto/TarjetaProducto'

export function ItemList({productos}) {
    return(
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px'}}>
            {productos.map((prod) => (
                <TarjetaProducto key={prod.id} {...prod} />
            ))}
        </div>
    );
}