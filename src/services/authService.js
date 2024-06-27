const API_URL = 'http://localhost:3000';  // Cambia esta URL si tu backend está en otra dirección

const login = async (form) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
  return response.json();
};

const register = async (form) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
  return response.json();
};

export default { login, register };
