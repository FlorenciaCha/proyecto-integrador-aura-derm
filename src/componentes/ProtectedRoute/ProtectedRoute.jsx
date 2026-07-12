import React, { use } from 'react';
import {useAuth} from '../../context/AuthContext';
import {Navigate} from 'react-router-dom';


const ProtectedRoute = ({children, rolesPermitidos}) => {
    const {user, loading} = useAuth();

    //Mientras se verfica el estado de autenticación, mostrar un mensaje de carga 
    //Esto es crucial para no redirigir al login prematuramente en una recarga de pagina
    if (loading){
        return <div>Cargando...</div>;
    }

    if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))){
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;