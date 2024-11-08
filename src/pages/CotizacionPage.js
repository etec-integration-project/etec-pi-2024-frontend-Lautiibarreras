import React, { useState } from 'react';
import axios from 'axios';

function Cotizacion() {
  const [tipoServicio, setTipoServicio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/cotizacion', {
        tipo_servicio: tipoServicio,
        cantidad: parseFloat(cantidad),
        id_usuario: null // Ajusta esto si tienes autenticación de usuario
      });
      setResultado(response.data.precioTotal);
    } catch (error) {
      console.error('Error al calcular cotización:', error);
    }
  };

  return (
    <div>
      <h1>Cotización</h1>
      {resultado !== null && (
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Precio Total: {resultado} pesos
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Tipo de Servicio:
          <select value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)} required>
            <option value="">Seleccione una opción</option>
            <option value="Desinfección tradicional por metro cuadrado">Desinfección tradicional por metro cuadrado</option>
            <option value="Termoniebla por metro cuadrado">Termoniebla por metro cuadrado</option>
            <option value="Termoniebla por kilómetro lineal">Termoniebla por kilómetro lineal</option>
          </select>
        </label>
        <label>
          Cantidad ({tipoServicio.includes('kilómetro') ? 'kilómetros lineales' : 'metros cuadrados'}):
          <input
            type="number"
            min="0"
            step="any"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </label>
        <button type="submit">Calcular Cotización</button>
      </form>
    </div>
  );
}

export default Cotizacion;
