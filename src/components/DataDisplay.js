import React from 'react';

const DataDisplay = ({ appointments }) => {
    return (
        <div>
            {appointments.length === 0 ? (
                <p>No hay citas disponibles.</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <strong>{appointment.description}</strong> - {appointment.appointment_date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DataDisplay;
