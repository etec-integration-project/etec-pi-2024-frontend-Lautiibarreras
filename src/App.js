import React, { Fragment, useState, useEffect } from 'react'; 
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import CitasPage from './pages/CitasPage'; // Nueva página para citas
import CotizacionPage from './pages/CotizacionPage'; // Nueva página para citas
import BACKEND from './config';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importar Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importar Bootstrap JS
import './App.css';  // Importar el archivo de estilos personalizados

const App = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [loggedInUser, setLoggedInUser] = useState(null); // Estado para manejar el usuario autenticado
    const [errorMessage, setErrorMessage] = useState('');

   
    // Función para registrar un usuario y luego iniciar sesión automáticamente
    const registerUser = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(`${BACKEND}/auth/registrar`, user, { withCredentials: true }); // Llamada al backend para registrar
            console.log('Usuario registrado:', response.data);
            await loginUser(); // Llamar la función loginUser directamente
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('El nombre de usuario ya está registrado. Por favor, elige otro.');
            } else {
                setErrorMessage('Error al registrar usuario. Inténtalo nuevamente.');
                console.error('Error al registrar usuario:', error);
            }
        }
    };

    // Función para iniciar sesión llamando al backend
    const loginUser = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND}/auth/iniciarSesion`, user, { withCredentials: true });
            console.log('Usuario autenticado:', response.data);
            setLoggedInUser(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Usuario o contraseña incorrectos.');
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Router>
            <Fragment>
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">MayBa</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cotizacion">Cotización</Link> {/* Acceso a la página de cotización sin iniciar sesión */}
                                </li>
                                {loggedInUser && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/citas">Citas</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <li className="nav-item dropdown dropstart">
                                <button className="btn btn-primary dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sign in
                                </button>
                                <form className="dropdown-menu p-4">
                                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                    <div className="mb-3">
                                        <label htmlFor="exampleDropdownFormEmail2" className="form-label">Usuario</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleDropdownFormEmail2" 
                                            name="username" 
                                            placeholder="Usuario" 
                                            value={user.username} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="exampleDropdownFormPassword2" 
                                            name="password" 
                                            placeholder="Password" 
                                            value={user.password} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                                            <label className="form-check-label" htmlFor="dropdownCheck2">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary me-2" onClick={loginUser}>Sign in</button>
                                    <button type="submit" className="btn btn-secondary" onClick={registerUser}>Register</button>
                                </form>
                            </li>
                        </div>
                    </div>
                </nav>

                {/* Rutas */}
                <Routes>
                    <Route exact path="/" element={
                        <div className="banner-container">
                            <div className="banner">
                                <h2 className="banner-text">Bienvenido a MayBa</h2>
                            </div>
                        </div>
                    } />
                    <Route path="/citas" element={loggedInUser ? <CitasPage userId={loggedInUser.id} /> : <Navigate to="/" />} />
                    <Route path="/cotizacion" element={<CotizacionPage />} /> {/* Nueva Ruta */}
                </Routes>
            </Fragment>
        </Router>
    );
};

export default App;
