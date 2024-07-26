import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DataForm.css';

const DataForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Enviando datos:', { username, password }); // Log para depuración

      const response = await axios.post('http://localhost:3000/api/registrar', {
        username,
        password
      });

      if (response.status === 201) {
        setUsername(''); // Reset the input fields
        setPassword('');
        alert('Usuario registrado con éxito');
      } else {
        console.error('Error submitting data:', response.statusText);
        alert('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message); // Log de error detallado
      alert('Error al enviar los datos');
    }
  };

  return (
    <div className="data-form">
      <h1>Registrar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username-input">Username:</label>
        <input
          type="text"
          id="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password-input">Password:</label>
        <input
          type="password"
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default DataForm;
