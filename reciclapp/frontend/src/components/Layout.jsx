import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-200">
      {/* Header superior */}
      <header className="bg-green-700 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
          ♻️ Reciclapp
        </h1>
        {user && (
          <div className="flex items-center gap-4">
            <p className="font-medium">Hola, {user.name}</p>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-3 text-sm">
        © {new Date().getFullYear()} Reciclapp — Cuidemos el planeta 🌎
      </footer>
    </div>
  );
}

export default Layout;
