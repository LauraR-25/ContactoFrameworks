import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  users: "contacto_frameworks_users",
  session: "contacto_frameworks_session"
};

const loadFromStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadFromStorage(STORAGE_KEYS.users, []));
  const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEYS.session, null));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.session, user);
  }, [user]);

  const login = (username, password) => {
    const match = users.find(
      (item) => item.username === username && item.password === password
    );
    if (!match) {
      return { ok: false, message: "Credenciales invalidas." };
    }
    setUser({ username: match.username, email: match.email });
    return { ok: true };
  };

  const register = ({ username, email, password }) => {
    const exists = users.some((item) => item.username === username || item.email === email);
    if (exists) {
      return { ok: false, message: "Usuario o correo ya registrados." };
    }
    setUsers((prev) => [...prev, { username, email, password }]);
    return { ok: true };
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, login, register, logout, isAuthenticated: !!user }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
