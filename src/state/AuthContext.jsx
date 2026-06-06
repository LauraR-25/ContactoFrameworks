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

  // Mantener los useEffects para persistencia reactiva normal
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.session, user);
  }, [user]);

  const login = (username, password) => {
    // ✅ CORRECCIÓN: Leemos directamente el LocalStorage para tener la lista más fresca real-time
    const currentUsers = loadFromStorage(STORAGE_KEYS.users, users);
    
    const match = currentUsers.find(
      (item) => item.username.trim().toLowerCase() === username.trim().toLowerCase() && item.password === password
    );
    
    if (!match) {
      return { ok: false, message: "Credenciales invalidas." };
    }
    
    const loggedUser = { username: match.username, email: match.email };
    setUser(loggedUser);
    saveToStorage(STORAGE_KEYS.session, loggedUser); // Guardado inmediato forzado
    return { ok: true };
  };

  const register = ({ username, email, password }) => {
    // ✅ CORRECCIÓN: Leemos la lista real-time antes de verificar si existe
    const currentUsers = loadFromStorage(STORAGE_KEYS.users, users);
    
    const exists = currentUsers.some(
      (item) => item.username.trim().toLowerCase() === username.trim().toLowerCase() || item.email.toLowerCase() === email.toLowerCase()
    );
    
    if (exists) {
      return { ok: false, message: "Usuario o correo ya registrados." };
    }
    
    const updatedUsers = [...currentUsers, { username, email, password }];
    
    // ✅ SOLUCIÓN AL RETRASO: Guardamos en el estado de React Y ADEMÁS escribimos directo al disco ya mismo
    setUsers(updatedUsers);
    saveToStorage(STORAGE_KEYS.users, updatedUsers); 
    
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.session); // Limpieza absoluta de la sesión anterior
    }
  };

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