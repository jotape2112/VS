import { useEffect, useState } from "react";
import api from "../services/api";

function Points() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await api.get("/points");
        setPoints(res.data);
      } catch (err) {
        console.error("Error al obtener puntos de reciclaje:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  if (loading) return <p className="p-4">Cargando puntos de reciclaje...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Puntos de Reciclaje</h1>

      {points.length === 0 ? (
        <p>No hay puntos registrados aún.</p>
      ) : (
        <ul className="space-y-3">
          {points.map((p) => (
            <li key={p._id} className="p-3 border rounded shadow-sm">
              <p><b>Nombre:</b> {p.name}</p>
              <p><b>Dirección:</b> {p.address}</p>
              <p><b>Materiales:</b> {p.materials.join(", ")}</p>
              <p><b>Creado por:</b> {p.companyId?.name || "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Points;
