import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)


fetch('/data/productos.json') 
  .then(respuesta => { 
    console.log('Respuesta cruda del servidor:', respuesta); 
    return respuesta.json(); 
  }) 
  .then(datos => { 
    console.log('¡Productos cargados!', datos); 
  }) 
  .catch(error => { 
    console.error('¡Ups! Hubo un error:', error); 
  }) 
  .finally(() => { 
    console.log('Proceso de carga de productos finalizado.'); 
  })  
         
; 