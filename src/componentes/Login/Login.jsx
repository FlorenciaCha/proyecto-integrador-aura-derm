import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(""); 
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg(""); 
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado: ", user);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error en el login: ", error.code, error.message);
                setErrorMsg("El correo o la contraseña son incorrectos.");
            });
    };

    return (
        <div className={`${styles.loginPageContainer} d-flex align-items-center justify-content-center px-3`}>
            <div className={`${styles.loginCard} card w-100 shadow-sm p-4 p-md-5`}>
                
                
                <div className="text-center mb-4">
                    <h2 className={`${styles.loginTitle} fw-light text-uppercase mb-2`}>Bienvenido a</h2>
                    <img src="/imagenes/logo-aura-derm.png" alt="Aura Derm" className="img-fluid my-3 mx-auto d-block" style={{ maxHeight: "60px" }} />
                    <p className="text-muted small">Inicia sesión para continuar en Aura Derm</p>
                </div>

              
                {errorMsg && (
                    <div className="alert alert-danger text-center py-2 small rounded-pill border-0" role="alert">
                        {errorMsg}
                    </div>
                )}

               
                <form onSubmit={handleLogin}>
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={`${styles.btnSubmit} btn w-100 py-2.5 mb-3 rounded-pill fw-semibold`}>
                        Ingresar
                    </button>
                </form>

                
                <div className="text-center mt-3">
                    <p className="text-muted mb-0 small">
                        ¿No tenés una cuenta?{' '}
                        <Link to="/register" className={`${styles.registerLink} fw-semibold`}>
                            Registrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;