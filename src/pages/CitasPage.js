import React, { useState } from 'react';
import axios from 'axios';
import BACKEND from '../config';

const CitasPage = ({ userId }) => {
    const [appointment, setAppointment] = useState({
        user_id: userId,  // Usamos el userId pasado como prop
        appointment_date: '',
        description: ''
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });
    };

    const addAppointment = async (e) => {
        e.preventDefault();

        // Obtener el token del almacenamiento (localStorage o sessionStorage)
        const token = localStorage.getItem('token'); // Suponiendo que el token se almacena en localStorage

        try {
            // Enviar el token en el encabezado de autorización
            const response = await axios.post(`${BACKEND}/appointments/asignar`, appointment, {
                headers: {
                    Authorization: `Bearer ${token}` // Incluimos el token en el encabezado
                }
            });
            setMessage('Cita agregada exitosamente');
        } catch (error) {
            setMessage('Error al agregar la cita');
            console.error('Error al asignar la cita:', error);
        }
    };

    return (
        <div className="container">
            <h2>Registrar Cita</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={addAppointment}>
                <div className="mb-3">
                    <label htmlFor="appointment_date" className="form-label">Fecha de la cita</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="appointment_date"
                        name="appointment_date"
                        value={appointment.appointment_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Descripción"
                        value={appointment.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Cita</button>
            </form>
        </div>
    );
};

export default CitasPage;
