import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CotizacionCSS.css'; // Asegúrate de tener el archivo CSS configurado

const Cotizacion = ({ userId }) => {
  const [tipoServicio, setTipoServicio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioTotal, setPrecioTotal] = useState(null);
  const [cotizacionesAnteriores, setCotizacionesAnteriores] = useState([]);

  useEffect(() => {
    // Obtener las cotizaciones anteriores del usuario
    const fetchCotizacionesAnteriores = async () => {
      try {
        const response = await axios.get(`/api/cotizaciones/cotizaciones/${userId}`);
        setCotizacionesAnteriores(response.data);
      } catch (error) {
        console.error('Error al obtener cotizaciones anteriores:', error);
      }
    };

    fetchCotizacionesAnteriores();
  }, [userId]);

  const handleCalcularCotizacion = async () => {
    try {
      const response = await axios.post('/api/cotizaciones/cotizacion', {
        tipo_servicio: tipoServicio,
        cantidad,
        id_usuario: userId,
      });
      setPrecioTotal(response.data.precioTotal); // Almacena el precio total calculado
      setCotizacionesAnteriores([...cotizacionesAnteriores, { cantidad }]); // Actualiza la lista de cotizaciones anteriores
    } catch (error) {
      console.error('Error al calcular cotización:', error);
    }
  };

  return (
    <div className="cotizacion-container">
      <div className="form-container">
        <h2>Cotizar producto</h2>
        <p>Obtén tu cotización personalizada en segundos.</p>
        
        <label>
          Tipo de Servicio:
          <select value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)} required>
            <option value="">Seleccionar</option>
            <option value="Desinfección tradicional por metro cuadrado">Desinfección tradicional por metro cuadrado</option>
            <option value="Termoniebla por metro cuadrado">Termoniebla por metro cuadrado</option>
            <option value="Termoniebla por kilómetro lineal">Termoniebla por kilómetro lineal</option>
          </select>
        </label>

        <label>
          Cantidad (metros cuadrados):
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            placeholder="Especifica la cantidad"
          />
        </label>

        <button onClick={handleCalcularCotizacion}>Calcular Cotización</button>

        {precioTotal !== null && (
          <div className="precio-total">
            <h3>Precio Total:</h3>
            <p>${precioTotal.toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="cotizaciones-anteriores">
        <h2>Cotizaciones Anteriores</h2>
        <ul>
          {cotizacionesAnteriores.map((cotizacion, index) => (
            <li key={index}>Cantidad: {cotizacion.cantidad} m²</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cotizacion;
