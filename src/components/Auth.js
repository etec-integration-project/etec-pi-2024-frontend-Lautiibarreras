import React, { useState } from 'react';
import authService from '../services/authService';

const Auth = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const response = await authService.login(form);
    console.log(response);
  };

  const handleRegister = async () => {
    const response = await authService.register(form);
    console.log(response);
  };

  return (
    <div>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Auth;
