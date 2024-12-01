import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND from '../config';

const CitasPage = ({ userId }) => {
    const [appointment, setAppointment] = useState({
        user_id: userId,
        appointment_date: '',
        description: '',
    });

    const [citas, setCitas] = useState([]); // Estado para almacenar las citas del usuario
    const [message, setMessage] = useState('');

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value,
        });
    };

    // Obtener citas del usuario al cargar la página
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get(`${BACKEND}/appointments/usuario/${userId}`);
                setCitas(response.data); // Guardar las citas obtenidas
            } catch (error) {
                console.error('Error al obtener las citas:', error);
                setMessage('Error al cargar tus citas.');
            }
        };

        if (userId) fetchCitas();
    }, []);

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND}/appointments/asignar`, appointment);
            setMessage('Cita asignada con éxito.');
            setAppointment({
                user_id: userId,
                appointment_date: '',
                description: '',
            });

            // Actualizar citas después de asignar una nueva
            const response = await axios.get(`${BACKEND}/appointments/usuario/${userId}`);
            setCitas(response.data);
        } catch (error) {
            console.error('Error al asignar la cita:', error);
            setMessage('Error al asignar la cita.');
        }
    };

    return (
        <div className="container">
            <h2>Gestión de Citas</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                        type="date"
                        name="appointment_date"
                        className="form-control"
                        value={appointment.appointment_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={appointment.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Asignar Cita</button>
            </form>

            {message && <p className="alert alert-info mt-3">{message}</p>}

            <h3 className="mt-4">Tus Citas</h3>
            <ul className="list-group">
                {citas.length > 0 ? (
                    citas.map((cita) => (
                        <li key={cita.id} className="list-group-item">
                            <strong>Fecha:</strong> {cita.appointment_date} <br />
                            <strong>Descripción:</strong> {cita.description}
                        </li>
                    ))
                ) : (
                    <p>No tienes citas asignadas.</p>
                )}
            </ul>
        </div>
    );
};

export default CitasPage;
