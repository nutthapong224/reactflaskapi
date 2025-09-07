import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchItemById, deleteItemById } from "../api";
import "./ItemDetail.css"; // สร้าง CSS แยกถ้าต้องการ

export default function ItemDetail() {
  const { id } = useParams(); // ดึง ID จาก URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await fetchItemById(id);
        setItem(data);
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Item not found");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteItemById(id);
      navigate("/"); // กลับไปหน้ารายการ
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card item-detail">
      <h2 className="card-title">{item.name}</h2>
      <p>ID: {id}</p>
      <button onClick={handleDelete} className="button delete">
        Delete Task
      </button>
    </div>
  );
}
