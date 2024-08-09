import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import DataDisplay from './components/DataDisplay';
import DataForm from './components/DataForm';
import BACKEND from './config';

const App = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [appointment, setAppointment] = useState({
        user_id: '',
        appointment_date: '',
        description: ''
    });

    const [appointments, setAppointments] = useState([]);
    const [listUpdated, setListUpdated] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`${BACKEND}/appointments/usuario/1`); // Asume user_id=1, deberías ajustar esto
                setAppointments(response.data);
            } catch (error) {
                console.error('Error al obtener las citas:', error);
            }
        };

        fetchAppointments();
        setListUpdated(false);
    }, [listUpdated]);

    const registerUser = async () => {
        try {
            const response = await axios.post(`${BACKEND}/auth/registrar`, user);
            console.log('Usuario registrado:', response.data);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const loginUser = async () => {
        try {
            const response = await axios.post(`${BACKEND}/auth/iniciarSesion`, user);
            console.log('Usuario autenticado:', response.data);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const addAppointment = async () => {
        try {
            await axios.post(`${BACKEND}/appointments/asignar`, appointment);
            setListUpdated(true);
        } catch (error) {
            console.error('Error al asignar la cita:', error);
        }
    };

    return (
        <Fragment>
            <Navbar brand="App" />
            <div className="container">
                <div className='row'>
                    <div className='col-7'>
                        <h2 style={{ textAlign: 'center' }}>Lista de Citas</h2>
                        <DataDisplay appointments={appointments} />
                    </div>
                    <div className='col-5'>
                        <h2 style={{ textAlign: 'center' }}>Formulario de Citas</h2>
                        <DataForm appointment={appointment} setAppointment={setAppointment} addAppointment={addAppointment} />
                        <h2 style={{ textAlign: 'center' }}>Registro de Usuario</h2>
                        <DataForm user={user} setUser={setUser} registerUser={registerUser} loginUser={loginUser} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default App;
