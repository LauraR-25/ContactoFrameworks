import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { useAuth } from "./state/AuthContext.jsx";

export default function App() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Contacto Frameworks</h1>
        <div className="app-header__right">
          {isAuthenticated ? (
            <>
              <span className="app-user">{user.username}</span>
              <button type="button" onClick={logout} className="btn">
                Cerrar sesion
              </button>
            </>
          ) : null}
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/contacts" : "/login"} replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <ContactsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
