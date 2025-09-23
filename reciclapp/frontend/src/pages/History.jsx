import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/requests/my");
        setRequests(res.data);
      } catch (err) {
        console.error("Error al obtener historial:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="p-4">Cargando historial...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de Solicitudes</h1>

      {requests.length === 0 ? (
        <p>No tienes solicitudes aún.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => (
            <li key={r._id} className="p-3 border rounded shadow-sm">
              <p><b>Dirección:</b> {r.address}</p>
              <p><b>Estado:</b> {r.status}</p>
              <p><b>Materiales:</b> {r.items.map(i => `${i.material} (${i.quantity})`).join(", ")}</p>
              <p><b>Fecha:</b> {new Date(r.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
