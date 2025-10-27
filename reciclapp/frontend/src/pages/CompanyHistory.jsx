import { useEffect, useState } from "react";
import api from "../services/api";

function CompanyHistory() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await api.get("/requests/completed");
        setRequests(res.data);
      } catch (err) {
        console.error("Error al obtener historial completado:", err);
      }
    };
    fetchCompleted();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">
        🏁 Historial de Solicitudes Completadas
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No hay solicitudes completadas.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-4 shadow rounded-lg border border-gray-200"
            >
              <p>
                <strong>📅 Fecha:</strong>{" "}
                {new Date(req.updatedAt).toLocaleDateString("es-CL")}{" "}
                {new Date(req.updatedAt).toLocaleTimeString("es-CL")}
              </p>
              <p>
                <strong>📍 Dirección:</strong> {req.address}
              </p>
              <p>
                <strong>🧱 Materiales:</strong>{" "}
                {req.items.map((i) => `${i.material} (${i.quantity})`).join(", ")}
              </p>
              <p>
                <strong>👤 Usuario:</strong> {req.userId?.name || "Desconocido"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyHistory;
