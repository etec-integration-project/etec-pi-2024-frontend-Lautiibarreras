import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND from '../config';

function PricesPage() {
    const [servicios, setServicios] = useState([]); // Lista de servicios obtenidos del backend
    const [servicioSeleccionado, setServicioSeleccionado] = useState(''); // Servicio seleccionado
    const [precio, setPrecio] = useState(''); // Precio para actualizar
    const [mensaje, setMensaje] = useState('');

    // Obtener servicios desde el backend al cargar la página
    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get(`${BACKEND}/precios/servicios`); // Reutilizar la lógica de cotizaciones
                console.log(response)
                setServicios(response.data);
                if (response.data.length > 0) {
                    setServicioSeleccionado(response.data[0].tipo_servicio); // Seleccionar el primer servicio por defecto
                }
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
                setMensaje('Error al cargar los servicios.');
            }
        };
        fetchServicios();
    }, []);

    // Manejar envío del formulario para actualizar el precio
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = 'admin';
            const password = 'admin123';
            const headers = { username, password };
            await axios.post(`${BACKEND}/precios/actualizar`,
                { tipo_servicio: servicioSeleccionado, precio },
                { headers }
            );
            setMensaje('Precio actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el precio:', error);
            setMensaje('Error al actualizar el precio.');
        }
    };

    return (
        <div className="container">
            <h2>Gestión de Precios</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tipo de Servicio</label>
                    <select
                        className="form-select"
                        value={servicioSeleccionado}
                        onChange={(e) => setServicioSeleccionado(e.target.value)}
                        required
                    >
                        {servicios.map((servicio, index) => (
                            <option key={index} value={servicio.tipo_servicio}>
                                {servicio.tipo_servicio}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
            {mensaje && <p className="mt-3 alert alert-info">{mensaje}</p>}
        </div>
    );
}

export default PricesPage;
