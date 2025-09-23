import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function NewRequest() {
  const [address, setAddress] = useState("");
  const [schedule, setSchedule] = useState("");
  const [items, setItems] = useState([{ material: "", quantity: 1 }]);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItems([...items, { material: "", quantity: 1 }]);
  };

  const handleChangeItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/requests", { address, schedule, items });
      alert("Solicitud creada con éxito ✅");
      navigate("/history"); // redirige al historial
    } catch (err) {
      console.error(err);
      alert("Error al crear la solicitud ❌");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Nueva Solicitud de Reciclaje</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <input
          type="datetime-local"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <h2 className="font-semibold">Materiales a reciclar:</h2>
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Material (ej. Plástico)"
              value={item.material}
              onChange={(e) =>
                handleChangeItem(index, "material", e.target.value)
              }
              className="p-2 border rounded flex-1"
              required
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleChangeItem(index, "quantity", e.target.value)
              }
              className="p-2 border rounded w-20"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-gray-500 text-white p-2 rounded"
        >
          + Agregar material
        </button>

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}

export default NewRequest;
