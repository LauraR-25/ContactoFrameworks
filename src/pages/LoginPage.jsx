import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(username.trim(), password.trim());
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError("");
    navigate("/contacts");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/contacts");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="card" style={{ maxWidth: "420px", margin: "0 auto" }}>
      <h2>Login</h2>
      <p>Usuario: admin | Contrasena: 1234</p>
      {error ? <p style={{ color: "#b42318" }}>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Usuario</label>
          <input value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-field">
          <label>Contrasena</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button className="btn primary" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}
