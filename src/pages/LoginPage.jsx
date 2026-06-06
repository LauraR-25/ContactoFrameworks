import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import AuthPanel from "../components/auth/AuthPanel.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/contacts");
    }
  }, [isAuthenticated, navigate]);

  return <AuthPanel onLogin={login} onRegister={register} />;
}
