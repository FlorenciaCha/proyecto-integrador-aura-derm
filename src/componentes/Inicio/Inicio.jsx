import React from "react";
import Productos from "../Productos/Productos";
import Servicios from "../Servicios/Servicios";

export function Inicio(){
    return(
        <div>
            <h1>Página de Inicio</h1>

            <Productos Mensaje="Productos destacados" />
            <Servicios Mensaje = "Nuestros servicios"/>
        </div>
    )
}

