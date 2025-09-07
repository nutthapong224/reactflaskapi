import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // เพิ่ม Link
import { fetchItems, createItem } from "../api";
import "./ItemList.css"; // Import CSS for ItemList

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  }

  async function handleAdd() {
    if (!newItem.trim()) return;
    try {
      await createItem({ name: newItem });
      setNewItem("");
      loadItems();
    } catch (err) {
      console.error("Error creating item:", err);
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Tasks</h2>
      <ul className="item-list">
        {items.map((item, i) => (
          <li key={item.id || i} className="item">
            {/* ใช้ Link ไปหน้า Detail */}
            <Link to={`/items/${item.id || i}`} className="item-link">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New task"
          className="input"
        />
        <button onClick={handleAdd} className="button">
          Add Task
        </button>
      </div>
    </div>
  );
}
