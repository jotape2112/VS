import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Credenciales incorrectas o error en login");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Entrar
        </button>
      </form>

      <p className="mt-4">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-600">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Login;
