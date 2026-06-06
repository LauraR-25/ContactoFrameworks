import { useEffect, useState } from "react";
import styles from "./AuthPanel.module.css";

const MAX_USERNAME = 20;
const MAX_PASSWORD = 15;

const sanitizeAlphaNum = (value, max) =>
  value.replace(/[^a-zA-Z0-9]/g, "").slice(0, max);

export default function AuthPanel({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetMessages = () => setMessage("");

  // FUNCIÓN NUEVA: Limpiar todos los inputs para evitar que se queden datos viejos pegados
  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetMessages();

    const safeUsername = username.trim();
    const safePassword = password.trim();

    if (!safeUsername || !safePassword) {
      setMessage("Usuario y contrasena son obligatorios.");
      return;
    }

    if (mode === "signup") {
      const safeEmail = email.trim();
      if (!safeEmail) {
        setMessage("El correo es obligatorio.");
        return;
      }
      const result = onRegister({ username: safeUsername, email: safeEmail, password: safePassword });
      if (!result.ok) {
        setMessage(result.message || "Error al registrar.");
        return;
      }
      
      // ✅ CORRECCIÓN AQUÍ: Al registrar con éxito, limpiamos los inputs 
      // para evitar que el autocompletado ponga el usuario viejo.
      clearInputs();
      setMessage("Cuenta creada con exito. ¡Inicia sesion ahora!");
      setMode("login");
      return;
    }

    const result = onLogin(safeUsername, safePassword);
    if (!result.ok) {
      setMessage(result.message || "Credenciales invalidas.");
      return;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.ring}>
        <i style={{ "--clr": "#00ff0a" }}></i>
        <i style={{ "--clr": "#ff0057" }}></i>
        <i style={{ "--clr": "#fffd44" }}></i>
        <div className={styles.login}>
          <h2>{mode === "login" ? "Login" : "Register"}</h2>
          {message && <div className={styles.message}>{message}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputBx}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                maxLength={MAX_USERNAME}
                onChange={(event) =>
                  setUsername(sanitizeAlphaNum(event.target.value, MAX_USERNAME))
                }
                autoComplete="off" // ✅ Evita interferencias del navegador
              />
            </div>
            
            {mode === "signup" && (
              <div className={styles.inputBx}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="off"
                />
              </div>
            )}

            <div className={styles.inputBx}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                maxLength={MAX_PASSWORD}
                onChange={(event) =>
                  setPassword(sanitizeAlphaNum(event.target.value, MAX_PASSWORD))
                }
                autoComplete="new-password" // ✅ Evita que rellene contraseñas viejas
              />
            </div>

            <div className={styles.inputBx}>
              <input type="submit" value={mode === "login" ? "Login" : "Register"} />
            </div>

            <div className={styles.links}>
              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  clearInputs(); // ✅ Limpia los campos al alternar entre pantallas
                  setMode((prev) => (prev === "login" ? "signup" : "login"));
                }}
              >
                {mode === "login" ? "Create an account" : "Back to Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}