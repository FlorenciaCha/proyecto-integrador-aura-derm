import './App.css'
import Productos from './componentes/Productos/Productos';
import Nosotros from './componentes/Nosotros/Nosotros';
import Layout from './componentes/Layout/Layout';
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer';
import { FormularioContainer } from './componentes/FormularioContainer/FormularioContainer';
import {Routes, Route} from 'react-router-dom';
import { Inicio } from './componentes/Inicio/Inicio';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle';
import Servicios from './componentes/Servicios/Servicios';

function App(){
  return(
    <Routes>
      <Route element={<Layout />}> 
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} />
        <Route path="/servicios" element={<Servicios Mensaje={"Todos nuestros servicios"} />} />
        <Route path="/destacados" element={<Productos Mensaje={"Todos los productos"}/>} /> 
        <Route path="/alta" element={<FormularioContainer />} /> 
        <Route path="/contacto" element={<Nosotros />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} /> 
      </Route> 

    </Routes>
  );
}

export default App;