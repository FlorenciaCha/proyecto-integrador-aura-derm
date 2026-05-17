import React, {use, useState} from 'react';

import {FormularioProductos} from '../FormularioProductos/FormularioProductos';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        
    });

    const [imagenFile, setImagenFile] = useState(null);

    //crear estado Loading
    const [cargando, setCargando] = useState(false); 

    const manejarCambio = (evento) => { 
        const { name, value } = evento.target; 
        setDatosForm({ 
            ...datosForm, 
            [name]: value 
        }); 
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        //validar que el usuario haya seleccionado una imagen
        if(!imagenFile){
            alert('Por favor, selecciona una imagen para el producto');
            return;
        }

        //Activar el estado de carga
        setCargando(true);

        //Logica para subir la imagen a Imgbb
        const apiKey = '04863fd9221128c97fbaffb9ddb824b8';
        const formData = new FormData();
        formData.append('image', imagenFile);

        try{
            console.log("Subiendo imagen a Imgbb...");
            const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });

            const datosImgbb = await respuesta.json();

            if(datosImgbb.success){
                console.log("Imagen subida exitosamente. URL:", datosImgbb.data.url);
            
                //Unir la URL de la imagen con el resto de los datos del formulario 
                const productoCompleto = {
                    ...datosForm,
                    urlImagen: datosImgbb.data.url
                };

                console.log('Enviando los siguientes datos a la API', productoCompleto);
            }
            else{
                throw new Error('Error al subir la imagen: ');
            }
            
        } catch (error) {
            console.error("Error en el proceso de envio:", error); 
            alert("Hubo un error al subir la imagen. Por favor, intenta nuevamente."); 
        } finally {
            // Desactivar el estado de carga en finally
            setCargando(false);
        }

        
    };

    

    return(
        <FormularioProductos 
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            cargando={cargando}
            
        />
    );

}