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
import Cart from './componentes/Cart/Cart';
import ProductosNacionales from './componentes/ProductosNacionales/ProductosNacionales';
import ProductosNacionalesDetalle from './componentes/ProductosNacionales/ProductosNacionalesDetalle';
import GestionCupones from './componentes/GestionCupones/GestionCupones';
import Gestion from './componentes/Gestion/Gestion';
import Registro from './componentes/Registro/Registro'
import Login from './componentes/Login/Login';
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import Perfil from './componentes/Perfil/Perfil';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  return(
    <Routes>
      <Route element={<Layout />}> 
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} />
        <Route path="/servicios" element={<Servicios Mensaje={"Todos nuestros servicios"} />} />
        <Route path="/destacados" element={<Productos Mensaje={"Todos los productos"}/>} /> 
        <Route
            path="/gestion"
            element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <Gestion />
            </ProtectedRoute>
            }
        />
        <Route path="/contacto" element={<Nosotros />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} /> 
        <Route path="/carrito" element={<Cart />} />
        <Route path="/productos-nacionales" element={<ProductosNacionales />} />
        <Route path="/productos-nacionales/:id" element={<ProductosNacionalesDetalle />} />
        <Route path="/admin/cupones" element={<GestionCupones />} />
        <Route
              path="/perfil"
              element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
              }
        />
        <Route path="/registro" element={<Registro />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route> 

    </Routes>
  );
}

export default App;