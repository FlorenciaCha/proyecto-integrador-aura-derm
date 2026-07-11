import React, { createContext, useState, useContext, useEffect } from 'react';
import{
    getAuth,
    onAuthStateChanged, 
    signOut, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
} from "firebase/auth";

import { getFirestore, doc, getDoc } from "firebase/firestore";

//1. Crear el contexto
export const AuthContext = createContext();

//Hook personalizado
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth debe ser usado dentro de un AuthProveder");
    }
    return context;
};

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();   //obtener la instancia de auth una sola vez
    const db = getFirestore();  //Inicializar Firestore

    //Funcion pra registrar un nuevo usuario 
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Funcion para iniciar sesion
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Funcion para cerrar sesión
    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        // onAuthStateChanged es el observador de Firebase
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser){
                //Si hay un usuario, buscar su rol en Firestore
                const userDocRef = doc(db, "usuarios", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists() && userDocSnap.data().rol === 'admin')
                {

                    //Si el documeto existe y tiene rol de admin, lo asignamos 
                        setUser({...currentUser, rol: 'admin'});
                }
                else{
                    setUser({...currentUser, rol: 'user'});
                }   
                
            }
            else{
                setUser(null);
            }
            setLoading(false);
        });

        //Limpiar el observador al desmontar
        return () => unsubscribe();

    }, [auth, db]); // agregar 'auth' como dependencia

    // Crear el objeto 'value' con todas las funciones definidas
    const value = {
        user, 
        loading, 
        signup,
        login, 
        logout,
    };
    //Retornar el Provider, asegurando de no renderizar hhasta que cargue 
    //Esto evita que los componentes hijos puedan acceder a 'user' cuando es null

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

};