import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DataForm.css';

const DataForm = () => {
  const [data, setData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/data', { // Asegúrate de que la URL esté correcta
        data: data
      });
      if (response.status === 200) {
        setData(''); // Reset the input field
        alert('Datos enviados correctamente');
      } else {
        console.error('Error submitting data:', response.statusText);
        alert('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error al enviar los datos');
    }
  };

  return (
    <div className="data-form">
      <h1>Enviar Datos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="data-input">Datos:</label>
        <input
          type="text"
          id="data-input"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default DataForm;
