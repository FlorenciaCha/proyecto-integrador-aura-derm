import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Registro.module.css'; 

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Intentar crear el nuevo usuario en Firebase 
            await createUserWithEmailAndPassword(auth, email, password);
            // Si la creación es exitosa, lo redirigimos al inicio
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?'
                );
                if (quiereLoguearse) {
                    navigate('/login');
                } else {
                    navigate('/');
                }
            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro: ", error.message);
            }
        }
    };

    return ( 
        <div className={`${styles.registerPageContainer} d-flex align-items-center justify-content-center px-3`}> 
            <div className={`${styles.registerCard} card w-100 shadow-sm p-4 p-md-5`}>
                
                {/* Encabezado */}
                <div className="text-center mb-4">
                    <h2 className={`${styles.registerTitle} fw-light text-uppercase mb-2`}>Crear Cuenta</h2> 
                    
                    {/* Logotipo de Marca Integrado */}
                    <img 
                        src="/imagenes/logo-aura-derm.png" 
                        alt="Aura Derm" 
                        className="img-fluid my-3 mx-auto d-block" 
                        style={{ maxHeight: "60px" }} 
                    />
                    
                    <p className="text-muted small">Registrate para comenzar tu ritual en Aura Derm</p>
                </div>

               
                {error && (
                    <div className="alert alert-danger text-center py-2 small rounded-pill border-0" role="alert">
                        {error}
                    </div>
                )}

                
                <form onSubmit={handleSubmit}> 
                    <div className="mb-3"> 
                        <label className={`${styles.inputLabel} form-label`}>Correo Electrónico</label> 
                        <input 
                            type="email" 
                            className={`${styles.customInput} form-control px-3 py-2`}
                            placeholder="ejemplo@correo.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        /> 
                    </div> 
                    
                    <div className="mb-4"> 
                        <label className={`${styles.inputLabel} form-label`}>Contraseña</label> 
                        <input 
                            type="password" 
                            className={`${styles.customInput} form-control px-3 py-2`}
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Mínimo 6 caracteres" 
                        /> 
                    </div> 
                    
                    <button type="submit" className={`${styles.btnSubmit} btn w-100 py-2.5 mb-3 rounded-pill fw-semibold`}>
                        Registrarse
                    </button> 
                </form> 

              
                <div className="text-center mt-3">
                    <p className="text-muted mb-0 small">
                        ¿Ya tenés una cuenta?{' '}
                        <Link to="/login" className={`${styles.loginLink} fw-semibold`}>
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div> 
        </div> 
    );
};

export default Registro;