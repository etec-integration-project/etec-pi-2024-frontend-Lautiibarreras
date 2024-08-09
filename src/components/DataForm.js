import React from 'react';

const DataForm = ({ user, setUser, registerUser, loginUser, appointment, setAppointment, addAppointment }) => {

    const handleUserChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleAppointmentChange = (e) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            {user && (
                <div>
                    <h3>Registro de Usuario</h3>
                    <input type="text" name="username" placeholder="Usuario" onChange={handleUserChange} value={user.username} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleUserChange} value={user.password} />
                    <button onClick={registerUser}>Registrar</button>
                    <button onClick={loginUser}>Iniciar Sesión</button>
                </div>
            )}
            {appointment && (
                <div>
                    <h3>Crear Cita</h3>
                    <input type="text" name="user_id" placeholder="ID del Usuario" onChange={handleAppointmentChange} value={appointment.user_id} />
                    <input type="datetime-local" name="appointment_date" placeholder="Fecha de Cita" onChange={handleAppointmentChange} value={appointment.appointment_date} />
                    <input type="text" name="description" placeholder="Descripción" onChange={handleAppointmentChange} value={appointment.description} />
                    <button onClick={addAppointment}>Agregar Cita</button>
                </div>
            )}
        </div>
    );
};

export default DataForm;
