import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { BASE_URL } from "../Api";

const Login = ({ handleUserType, handleLoginSuccess, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Email:", email);
      console.log("Password:", password);

      const response = await axios.post(
        `${BASE_URL}/user/login/${email}/${password}`
      );

      console.log(response);

      if (response.status === 200) {
        const { userType } = response.data;
        handleUserType(userType);
        handleLoginSuccess();
        closeModal();
        console.log("Entrou! Tipo de usuário:", userType);
      } else {
        const errorData = response.data;
        console.log(errorData);
        setError(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
